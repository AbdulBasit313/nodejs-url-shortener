const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const shortId = require('shortid')
const dotenv = require('dotenv')

dotenv.config({ path: '../config.env' })

const Url = require('../models/url')

router.get('/', async (req, res) => {
  const urls = await Url.find()
  res.render('index', { urls })
})

// @route     POST
// @desc      Create short URL
router.post('/shortUrl', async (req, res) => {
  const { fullUrl } = req.body
  const baseUrl = process.env.BASE_URL

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url')
  }

  const urlCode = shortId.generate()

  // check if entered url already exist or not
  if (validUrl.isUri(fullUrl)) {
    try {
      let url = await Url.findOne({ fullUrl })

      if (url) {
        // res.json(url)
        res.status(401).json('Url already exist')
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`

        url = new Url({
          fullUrl,
          shortUrl,
          urlCode,
        })

        await url.save()

        // res.json(url)

        res.redirect('/')
      }
    } catch (error) {
      console.log(error)
      res.status(500).json('Server Error')
    }
  } else {
    res.status(401).json('Invalid Url')
  }
})

router.get('/:code', async (req, res) => {
  const url = await Url.findOne({ urlCode: req.params.code })

  if (url) {
    url.clicks++
    url.save()

    return res.redirect(url.fullUrl)
  } else {
    return res.status(404).json('No url found!')
  }
})

module.exports = router
