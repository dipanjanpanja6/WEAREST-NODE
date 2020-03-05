const NodeGeocoder = require('node-geocoder')
var DarkSky = require('forecast.io');
const requestIp = require('request-ip');
const OAuth = require('oauth')
const moment = require('moment')
const geoip = require('geoip-lite')
const axios = require('axios');
//const request = require('request')


const CONSUMER_KEY = 'dj0yJmk9TVR0d3h5ZDkwcGVOJmQ9WVdrOVJITnBUSGg0TjJjbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTVl'
const CONSUMER_SECRET = 'e830a665039125aad1c13d6e8170d5328a4c9db8'
const APP_ID = 'DsiLxx7g'

exports.getIp = (req, res) =>{
  axios.get('https://api.ipify.org?format=jsonp&callback=?')
  .then((response)=>{
     
      
      const h = response.data
      const a = h.split(':')[1]
      const b = a.split('}')[0]
      const c = b.split('"')[1]

      var geo = geoip.lookup(c)
      const city = geo.city
     
      
     const header = {
      "X-Yahoo-App-Id": APP_ID
    }

     const request = new OAuth.OAuth(
      null,
      null,
      CONSUMER_KEY,
      CONSUMER_SECRET,
      '1.0',
      null,
      'HMAC-SHA1',
      null,
      header
    )
    request.get(
      `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${city},ca&format=json`,
      null,
      null,
      function(err, data, result){
        if(err) return res.json(err)
        else if(data != "") {
          const a = data.split(',')
         const city = a[0]
         const city_name = city.split(':')[2]
         const city_name_1 = city_name.split('"')[1]
  
         const region = a[1]
         const region_name = region.split(':')[1].split('"')[1]
  
         const woeid = a[2].split(':')[1]
  
         const country = a[3].split(':')[1].split('"')[1]
          
  
         const temperature = a[18].split(':')[1].split('}')[0]
         const c_vale = Math.round((temperature -32) * 5 / 9)
  
         const condition = a[16].split(':')[2].split('"')[1]
  
         const day = a[20].split(':')[2].split('"')[1]
  
         const pubDate = a[19].split(':')[1].split('}')[0]
         
         const dt = new Date(pubDate * 1000)
         const date = dt.toDateString()
         const dl = new Date(pubDate * 1000) 
         //const d = date.toGMTString()
         const month = dl.getMonth() + 1
         
         let season = ''
         switch(month){
          case 12:
            case 1:
            case 2:
                season = 'WINTER'
                break;
            case 3:
            case 4:
            case 5:
                season = 'SPRING'
                break;
            case 6:
            case 7:
            case 8:
                season = 'SUMMER'
                break;
            case 9:
            case 10:
            case 11:
                season = 'MONSOON'
                break;
         }
  
         const day_1_date = a[27].split(':')[1]
         const day_1_dt = new Date(day_1_date * 1000)
         const day_1_f_d = day_1_dt.toDateString()
         const day_1_month = day_1_dt.getMonth() + 1
         const day_1_temp = a[29].split(':')[1]
         const day_1_c_vale = Math.round((day_1_temp -32) * 5 / 9)
         const day_1_condition = a[30].split(':')[1].split('"')[1]
         const day_1_day = a[26].split(':')[1].split('"')[1]
         let day_1_season = ''
         switch(day_1_month){
          case 12:
            case 1:
            case 2:
              day_1_season = 'WINTER'
                break;
            case 3:
            case 4:
            case 5:
              day_1_season = 'SPRING'
                break;
            case 6:
            case 7:
            case 8:
              day_1_season = 'SUMMER'
                break;
            case 9:
            case 10:
            case 11:
              day_1_season = 'MONSOON'
                break;
         }
         const dd = day_1_day.split('')
  
         const day_2_day = a[32].split(':')[1].split('"')[1]
         const day_2_dat = a[33].split(':')[1]
         const day_2_date = new Date(day_2_dat * 1000)
         const day_2_month = day_2_date.getMonth()
         const day_2_temp = a[35].split(':')[1]
         const day_2_c_temp = Math.round((day_2_temp - 32) * 5 /7)
         const day_2_condition = a[36].split(':')[1].split('"')[1]
         let day_2_season = ''
         switch(day_2_month){
          case 12:
            case 1:
            case 2:
              day_2_season = 'WINTER'
                break;
            case 3:
            case 4:
            case 5:
              day_2_season = 'SPRING'
                break;
            case 6:
            case 7:
            case 8:
              day_2_season = 'SUMMER'
                break;
            case 9:
            case 10:
            case 11:
              day_2_season = 'MONSOON'
                break;
         }
         const d2d = day_2_day.split('')
  
         const day_3_day = a[38].split(':')[1].split('"')[1]
         const day_3_da = a[39].split(':')[1]
         const day_3_date = new Date(day_3_da * 1000)
         const day_3_month = day_3_date.getMonth()
         const day_3_temp = a[41].split(':')[1]
         const day_3_c_temp = Math.round((day_3_temp - 32) * 5 / 7)
         const day_3_condition = a[42].split(':')[1].split('"')[1]
         const d3d = day_3_day.split('')
         let day_3_season = ''
         switch(day_3_month){
          case 12:
            case 1:
            case 2:
              day_3_season = 'WINTER'
                break;
            case 3:
            case 4:
            case 5:
              day_3_season = 'SPRING'
                break;
            case 6:
            case 7:
            case 8:
              day_3_season = 'SUMMER'
                break;
            case 9:
            case 10:
            case 11:
              day_3_season = 'MONSOON'
                break;
         }
  
         const day_4_day = a[44].split(':')[1].split('"')[1]
         const day_4_da = a[45].split(':')[1]
         const day_4_date = new Date(day_4_da * 1000)
         const day_4_month = day_4_date.getMonth()
         const day_4_temp = a[47].split(':')[1]
         const day_4_c_temp = Math.round((day_4_temp - 32) * 5/7)
         const day_4_condition = a[48].split(':')[1].split('"')[1]
         const d4d = day_4_day.split('')
         let day_4_season = ''
         switch(day_4_month){
          case 12:
            case 1:
            case 2:
              day_4_season = 'WINTER'
                break;
            case 3:
            case 4:
            case 5:
              day_4_season = 'SPRING'
                break;
            case 6:
            case 7:
            case 8:
              day_4_season = 'SUMMER'
                break;
            case 9:
            case 10:
            case 11:
              day_4_season = 'MONSOON'
                break;
         }
  
         const day_5_day = a[50].split(':')[1].split('"')[1]
         const day_5_da = a[51].split(':')[1]
         const day_5_date = new Date(day_5_da * 1000)
         const day_5_month = day_5_date.getMonth()
         const day_5_temp = a[53].split(':')[1]
         const day_5_c_temp = Math.round((day_5_temp - 32) * 5 / 7)
         const day_5_condition = a[54].split(':')[1].split('"')[1]
         const d5d = day_5_day.split('')
         let day_5_season = ''
         switch(day_5_month){
          case 12:
            case 1:
            case 2:
              day_5_season = 'WINTER'
                break;
            case 3:
            case 4:
            case 5:
              day_5_season = 'SPRING'
                break;
            case 6:
            case 7:
            case 8:
              day_5_season = 'SUMMER'
                break;
            case 9:
            case 10:
            case 11:
              day_5_season = 'MONSOON'
                break;
         }
  
         const day_6_day = a[56].split(':')[1].split('"')[1]
         const day_6_da = a[57].split(':')[1]
         const day_6_date = new Date(day_6_da * 1000)
         const day_6_month = day_6_date.getMonth()
         const day_6_temp = a[59].split(':')[1]
         const day_6_c_temp = Math.round((day_6_temp - 32) * 5 / 7)
         const day_6_condition = a[60].split(':')[1].split('"')[1]
         const d6d = day_6_day.split('')
         let day_6_season = ''
         switch(day_6_month){
          case 12:
            case 1:
            case 2:
              day_6_season = 'WINTER'
                break;
            case 3:
            case 4:
            case 5:
              day_6_season = 'SPRING'
                break;
            case 6:
            case 7:
            case 8:
              day_6_season = 'SUMMER'
                break;
            case 9:
            case 10:
            case 11:
              day_6_season = 'MONSOON'
                break;
         }
        // return res.json({  a})
  
         const weather_data = {
           day6:{
            date:day_6_date.toDateString(),
            month:day_6_month,
            season:day_6_season,
            day:day_6_day,
            c_temperature:day_6_c_temp,
            f_temperature:day_6_temp,
            condition:day_6_condition,
            day_data:{
             d_1:d6d[0].toLocaleUpperCase(),
             d_2:d6d[1].toLocaleUpperCase(),
             d_3:d6d[2].toLocaleUpperCase()
            }
           },
           day5:{
            date:day_5_date.toDateString(),
            month:day_5_month,
            season:day_5_season,
            day:day_5_day,
            c_temperature:day_5_c_temp,
            f_temperature:day_5_temp,
            condition:day_5_condition,
            day_data:{
             d_1:d5d[0].toLocaleUpperCase(),
             d_2:d5d[1].toLocaleUpperCase(),
             d_3:d5d[2].toLocaleUpperCase()
            }
           },
           day4:{
            date:day_4_date.toDateString(),
            month:day_4_month,
            season:day_4_season,
            day:day_4_day,
            c_temperature:day_4_c_temp,
            f_temperature:day_4_temp,
            condition:day_4_condition,
            day_data:{
             d_1:d4d[0].toLocaleUpperCase(),
             d_2:d4d[1].toLocaleUpperCase(),
             d_3:d4d[2].toLocaleUpperCase()
            }
           },
           day3:{
             date:day_3_date.toDateString(),
             month:day_3_month,
             season:day_3_season,
             day:day_3_day,
             c_temperature:day_3_c_temp,
             f_temperature:day_3_temp,
             condition:day_3_condition,
             day_data:{
              d_1:d3d[0].toLocaleUpperCase(),
              d_2:d3d[1].toLocaleUpperCase(),
              d_3:d3d[2].toLocaleUpperCase()
             }
           },
           day2:{
             date:day_2_date.toDateString(),
             month:day_2_month,
             day:day_2_day,
             season:day_2_season,
             c_temperature:day_2_c_temp,
             f_temperature:day_2_temp,
             condition:day_2_condition,
             day_data:{
              d_1:d2d[0].toLocaleUpperCase(),
              d_2:d2d[1].toLocaleUpperCase(),
              d_3:d2d[2].toLocaleUpperCase()
             }
          
           },
           day_1:{
             date:day_1_f_d,
             month:day_1_month,
             season:day_1_season,
             c_temperature:day_1_c_vale,
             f_temperature:day_1_temp,
             condition:day_1_condition,
             day:day_1_day,
             day_data:{
               d_1:dd[0].toLocaleUpperCase(),
               d_2:dd[1].toLocaleUpperCase(),
               d_3:dd[2].toLocaleUpperCase()
             }
        
           },
          city:city_name_1,
          region:region_name,
          woeid:woeid,
          country:country,
          c_temperature:c_vale,
          f_temperature:temperature,
          condition:condition,
          forecasts:{
            day:day,
            date:date.toLocaleUpperCase(),
            month:month
          },
          season:season
        }
  
        return res.json(weather_data)
        }
      
      }
    )
      

  })
  .catch((error)=>{
      return res.json(error)
  })
}

exports.getLocation = (req, res) =>{

  const value = req.params.city
  const header = {
    "X-Yahoo-App-Id": APP_ID
  }

 
  


  const request = new OAuth.OAuth(
    null,
    null,
    CONSUMER_KEY,
    CONSUMER_SECRET,
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
  )
  request.get(
    `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${value},ca&format=json`,
    null,
    null,
    function(err, data, result){
      if(err) return res.json(err)
      else if(data != "") {
        const a = data.split(',')
       const city = a[0]
       const city_name = city.split(':')[2]
       const city_name_1 = city_name.split('"')[1]

       const region = a[1]
       const region_name = region.split(':')[1].split('"')[1]

       const woeid = a[2].split(':')[1]

       const country = a[3].split(':')[1].split('"')[1]
        

       const temperature = a[18].split(':')[1].split('}')[0]
       const c_vale = Math.round((temperature -32) * 5 / 9)

       const condition = a[16].split(':')[2].split('"')[1]

       const day = a[20].split(':')[2].split('"')[1]

       const pubDate = a[19].split(':')[1].split('}')[0]
       
       const dt = new Date(pubDate * 1000)
       const date = dt.toDateString()
       const dl = new Date(pubDate * 1000) 
       //const d = date.toGMTString()
       const month = dl.getMonth() + 1
       
       let season = ''
       switch(month){
        case 12:
          case 1:
          case 2:
              season = 'WINTER'
              break;
          case 3:
          case 4:
          case 5:
              season = 'SPRING'
              break;
          case 6:
          case 7:
          case 8:
              season = 'SUMMER'
              break;
          case 9:
          case 10:
          case 11:
              season = 'MONSOON'
              break;
       }

       const day_1_date = a[27].split(':')[1]
       const day_1_dt = new Date(day_1_date * 1000)
       const day_1_f_d = day_1_dt.toDateString()
       const day_1_month = day_1_dt.getMonth() + 1
       const day_1_temp = a[29].split(':')[1]
       const day_1_c_vale = Math.round((day_1_temp -32) * 5 / 9)
       const day_1_condition = a[30].split(':')[1].split('"')[1]
       const day_1_day = a[26].split(':')[1].split('"')[1]
       let day_1_season = ''
       switch(day_1_month){
        case 12:
          case 1:
          case 2:
            day_1_season = 'WINTER'
              break;
          case 3:
          case 4:
          case 5:
            day_1_season = 'SPRING'
              break;
          case 6:
          case 7:
          case 8:
            day_1_season = 'SUMMER'
              break;
          case 9:
          case 10:
          case 11:
            day_1_season = 'MONSOON'
              break;
       }
       const dd = day_1_day.split('')

       const day_2_day = a[32].split(':')[1].split('"')[1]
       const day_2_dat = a[33].split(':')[1]
       const day_2_date = new Date(day_2_dat * 1000)
       const day_2_month = day_2_date.getMonth()
       const day_2_temp = a[35].split(':')[1]
       const day_2_c_temp = Math.round((day_2_temp - 32) * 5 /7)
       const day_2_condition = a[36].split(':')[1].split('"')[1]
       let day_2_season = ''
       switch(day_2_month){
        case 12:
          case 1:
          case 2:
            day_2_season = 'WINTER'
              break;
          case 3:
          case 4:
          case 5:
            day_2_season = 'SPRING'
              break;
          case 6:
          case 7:
          case 8:
            day_2_season = 'SUMMER'
              break;
          case 9:
          case 10:
          case 11:
            day_2_season = 'MONSOON'
              break;
       }
       const d2d = day_2_day.split('')

       const day_3_day = a[38].split(':')[1].split('"')[1]
       const day_3_da = a[39].split(':')[1]
       const day_3_date = new Date(day_3_da * 1000)
       const day_3_month = day_3_date.getMonth()
       const day_3_temp = a[41].split(':')[1]
       const day_3_c_temp = Math.round((day_3_temp - 32) * 5 / 7)
       const day_3_condition = a[42].split(':')[1].split('"')[1]
       const d3d = day_3_day.split('')
       let day_3_season = ''
       switch(day_3_month){
        case 12:
          case 1:
          case 2:
            day_3_season = 'WINTER'
              break;
          case 3:
          case 4:
          case 5:
            day_3_season = 'SPRING'
              break;
          case 6:
          case 7:
          case 8:
            day_3_season = 'SUMMER'
              break;
          case 9:
          case 10:
          case 11:
            day_3_season = 'MONSOON'
              break;
       }

       const day_4_day = a[44].split(':')[1].split('"')[1]
       const day_4_da = a[45].split(':')[1]
       const day_4_date = new Date(day_4_da * 1000)
       const day_4_month = day_4_date.getMonth()
       const day_4_temp = a[47].split(':')[1]
       const day_4_c_temp = Math.round((day_4_temp - 32) * 5/7)
       const day_4_condition = a[48].split(':')[1].split('"')[1]
       const d4d = day_4_day.split('')
       let day_4_season = ''
       switch(day_4_month){
        case 12:
          case 1:
          case 2:
            day_4_season = 'WINTER'
              break;
          case 3:
          case 4:
          case 5:
            day_4_season = 'SPRING'
              break;
          case 6:
          case 7:
          case 8:
            day_4_season = 'SUMMER'
              break;
          case 9:
          case 10:
          case 11:
            day_4_season = 'MONSOON'
              break;
       }

       const day_5_day = a[50].split(':')[1].split('"')[1]
       const day_5_da = a[51].split(':')[1]
       const day_5_date = new Date(day_5_da * 1000)
       const day_5_month = day_5_date.getMonth()
       const day_5_temp = a[53].split(':')[1]
       const day_5_c_temp = Math.round((day_5_temp - 32) * 5 / 7)
       const day_5_condition = a[54].split(':')[1].split('"')[1]
       const d5d = day_5_day.split('')
       let day_5_season = ''
       switch(day_5_month){
        case 12:
          case 1:
          case 2:
            day_5_season = 'WINTER'
              break;
          case 3:
          case 4:
          case 5:
            day_5_season = 'SPRING'
              break;
          case 6:
          case 7:
          case 8:
            day_5_season = 'SUMMER'
              break;
          case 9:
          case 10:
          case 11:
            day_5_season = 'MONSOON'
              break;
       }

       const day_6_day = a[56].split(':')[1].split('"')[1]
       const day_6_da = a[57].split(':')[1]
       const day_6_date = new Date(day_6_da * 1000)
       const day_6_month = day_6_date.getMonth()
       const day_6_temp = a[59].split(':')[1]
       const day_6_c_temp = Math.round((day_6_temp - 32) * 5 / 7)
       const day_6_condition = a[60].split(':')[1].split('"')[1]
       const d6d = day_6_day.split('')
       let day_6_season = ''
       switch(day_6_month){
        case 12:
          case 1:
          case 2:
            day_6_season = 'WINTER'
              break;
          case 3:
          case 4:
          case 5:
            day_6_season = 'SPRING'
              break;
          case 6:
          case 7:
          case 8:
            day_6_season = 'SUMMER'
              break;
          case 9:
          case 10:
          case 11:
            day_6_season = 'MONSOON'
              break;
       }
      // return res.json({  a})

       const weather_data = {
         day6:{
          date:day_6_date.toDateString(),
          month:day_6_month,
          season:day_6_season,
          day:day_6_day,
          c_temperature:day_6_c_temp,
          f_temperature:day_6_temp,
          condition:day_6_condition,
          day_data:{
           d_1:d6d[0].toLocaleUpperCase(),
           d_2:d6d[1].toLocaleUpperCase(),
           d_3:d6d[2].toLocaleUpperCase()
          }
         },
         day5:{
          date:day_5_date.toDateString(),
          month:day_5_month,
          season:day_5_season,
          day:day_5_day,
          c_temperature:day_5_c_temp,
          f_temperature:day_5_temp,
          condition:day_5_condition,
          day_data:{
           d_1:d5d[0].toLocaleUpperCase(),
           d_2:d5d[1].toLocaleUpperCase(),
           d_3:d5d[2].toLocaleUpperCase()
          }
         },
         day4:{
          date:day_4_date.toDateString(),
          month:day_4_month,
          season:day_4_season,
          day:day_4_day,
          c_temperature:day_4_c_temp,
          f_temperature:day_4_temp,
          condition:day_4_condition,
          day_data:{
           d_1:d4d[0].toLocaleUpperCase(),
           d_2:d4d[1].toLocaleUpperCase(),
           d_3:d4d[2].toLocaleUpperCase()
          }
         },
         day3:{
           date:day_3_date.toDateString(),
           month:day_3_month,
           season:day_3_season,
           day:day_3_day,
           c_temperature:day_3_c_temp,
           f_temperature:day_3_temp,
           condition:day_3_condition,
           day_data:{
            d_1:d3d[0].toLocaleUpperCase(),
            d_2:d3d[1].toLocaleUpperCase(),
            d_3:d3d[2].toLocaleUpperCase()
           }
         },
         day2:{
           date:day_2_date.toDateString(),
           month:day_2_month,
           day:day_2_day,
           season:day_2_season,
           c_temperature:day_2_c_temp,
           f_temperature:day_2_temp,
           condition:day_2_condition,
           day_data:{
            d_1:d2d[0].toLocaleUpperCase(),
            d_2:d2d[1].toLocaleUpperCase(),
            d_3:d2d[2].toLocaleUpperCase()
           }
        
         },
         day_1:{
           date:day_1_f_d,
           month:day_1_month,
           season:day_1_season,
           c_temperature:day_1_c_vale,
           f_temperature:day_1_temp,
           condition:day_1_condition,
           day:day_1_day,
           day_data:{
             d_1:dd[0].toLocaleUpperCase(),
             d_2:dd[1].toLocaleUpperCase(),
             d_3:dd[2].toLocaleUpperCase()
           }
      
         },
        city:city_name_1,
        region:region_name,
        woeid:woeid,
        country:country,
        c_temperature:c_vale,
        f_temperature:temperature,
        condition:condition,
        forecasts:{
          day:day,
          date:date.toLocaleUpperCase(),
          month:month
        },
        season:season
      }

      return res.json(weather_data)
      }
    
    }
  )
}