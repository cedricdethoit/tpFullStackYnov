const { Appointment, User } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ProviderController {
  async index (req, res) {
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      },
      include: [{ model: User, as: 'user' }]
    })
    return res.render('provider/index', { appointments })
  }
}

module.exports = new ProviderController()
