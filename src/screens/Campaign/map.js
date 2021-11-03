export const campaignType = [
    {
        name:'Banner Ad',
        text1:'Banner Ad',
        text2:'Displayed on the home page',
        text3:'Starting from 4,000 points or $20/week',
        image:require('../../../assets/images/ad.jpg'),

    },
    {
        name:'Sponsored Products',
        text1:'Sponsored Products',
        text2:'Add your products to the featured list',
        text3:'Starting from 4,000 points or $20/week',
        image:require('../../../assets/images/ad2.jpg'),

    },
    {
        name:'Web Ad',
        text1:'Web Ad',
        text2:'Advertise your product throughout the platform',
        text3:'Starting from 4,000 points or $20/week',
        image:require('../../../assets/images/ad2.jpg'),

    },
]

export const dummyData = [
    {title:"banner Ad",image:`${require("../../../assets/images/mycampaign1.jpg")}`,dataSecondChart : {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43, 70]
        }
      ]
    },
  name:"Campaign 1",
  points:50,
  timeLeft:'1D 20H',
  clicks:500},
    {title:"Web Ad",image:`${require("../../../assets/images/mycampaign2.jpg")}`,dataSecondChart : {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43, 70]
        }
      ]
    },
  name:"Campaign 2",
  points:40,
  timeLeft:'1D 10H',
  clicks:500}
  ]