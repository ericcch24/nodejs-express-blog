// const bcrypt = require('bcrypt');
const { sequelize } = require('../models/index')
const db = require('../models')
const Admin = db.Admin
const Blog = db.Blog

const adminController = {
  login: (req, res) => {
    res.render('login')
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '你有東西沒填')
      return next()
    }

    Admin.findOne({
      where: {
        username
      }
    }).then(admin => {
      if (!admin) {
        req.flash('errorMessage', '帳號不存在')
        return next()
      }
      if (password !== admin.password) {
        req.flash('errorMessage', '密碼錯誤')
        return next()
      }
      req.session.username = admin.username
      req.session.adminId = admin.id
      res.redirect('/')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },

  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },

  admin: (req, res) => {
    Blog.findAll({
      order: sequelize.literal('id DESC'),
      include: Admin
    }).then(blogs => {
      res.render('admin', {
        blogs
      })
    })
  }
}
module.exports = adminController
