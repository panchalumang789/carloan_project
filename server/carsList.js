const carsList = [
  {
    make: "Tata",
    model: "Harrier",
    production_year: ["2018", "Present"],
    model_type: "Harrier XE",
    image: "https://imgd.aeplcdn.com/1056x594/n/itrlssa_1480042.jpg?q=75&wm=1",
  },
  {
    make: "Tata",
    model: "Harrier",
    production_year: ["2018", "2022"],
    model_type: "Harrier XM",
    image: "https://imgd.aeplcdn.com/1056x594/n/d7hd5ua_1559829.jpg?q=75&wm=1",
  },
  {
    make: "Tata",
    model: "Harrier",
    production_year: ["2018", "Present"],
    model_type: "Harrier XMS",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/45888/tata-harrier-left-rear-three-quarter146.jpeg?wm=1&q=75",
  },
  {
    make: "Tata",
    model: "Safari",
    production_year: ["2010", "2020"],
    model_type: "Safari XM",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/40027/safari-exterior-right-front-three-quarter-2.jpeg?q=75&wm=1",
  },
  {
    make: "Tata",
    model: "Safari",
    production_year: ["2012", "2022"],
    model_type: "Safari XMS",
    image: "https://imgd.aeplcdn.com/1056x594/n/xt88s4a_1533941.jpg?q=75&wm=1",
  },
  {
    make: "Hyundai",
    model: "i10",
    production_year: ["2011", "Present"],
    model_type: "i10 Grand LXi",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/35465/grand-i10-nios-exterior-right-front-three-quarter-2.jpeg?q=75&wm=1",
  },
  {
    make: "Hyundai",
    model: "i10",
    production_year: ["2011", "Present"],
    model_type: "i10 Nios LXi",
    image: "https://imgd.aeplcdn.com/1056x594/n/uqbkksa_1470092.jpg?q=75&wm=1",
  },
  {
    make: "Hyundai",
    model: "i20",
    production_year: ["2015", "Present"],
    model_type: "i20 Sports MT Sportz",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/40530/i20-exterior-right-front-three-quarter-5.jpeg?q=75&wm=1",
  },
  {
    make: "Hyundai",
    model: "i20",
    production_year: ["2015", "Present"],
    model_type: "i20 Sports MT Asta",
    image: "https://imgd.aeplcdn.com/1056x594/n/afunita_1494537.jpg?q=75&wm=1",
  },
  {
    make: "Honda",
    model: "Amaze",
    production_year: ["2014", "Present"],
    model_type: "Amaze S MT",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/45951/amaze-facelift-exterior-right-front-three-quarter.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Honda",
    model: "Amaze",
    production_year: ["2014", "2020"],
    model_type: "Amaze VX MT",
    image: "https://imgd.aeplcdn.com/1056x594/n/7q7i64a_1529415.jpg?q=75&wm=1",
  },
  {
    make: "Honda",
    model: "Honda City",
    production_year: ["2014", "Present"],
    model_type: "Honda City V CVT",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/40535/all-new-city-exterior-right-front-three-quarter.jpeg?q=75&wm=1",
  },
  {
    make: "Honda",
    model: "Honda City",
    production_year: ["2014", "2020"],
    model_type: "Honda City VX Petrol",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/107713/honda-city-left-front-three-quarter22.jpeg?isig=0&wm=1&q=75",
  },
  {
    make: "Mahindra",
    model: "Thar",
    production_year: ["2014", "Present"],
    model_type: "Thar AX OPT",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/50345/mahindra-thar-2020-right-front-three-quarter192.jpeg?wm=1&q=75",
  },
  {
    make: "Mahindra",
    model: "Thar",
    production_year: ["2014", "Present"],
    model_type: "Thar LX",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg?q=75&wm=1",
  },
  {
    make: "Mahindra",
    model: "Scorpio",
    production_year: ["2014", "Present"],
    model_type: "Scorpio AX OPT",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-15.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Mahindra",
    model: "Scorpio",
    production_year: ["2014", "Present"],
    model_type: "Scorpio LX",
    image: "https://imgd.aeplcdn.com/1056x594/n/mwvns3a_1588139.jpg?q=75&wm=1",
  },
  {
    make: "Mahindra",
    model: "XUV 700",
    production_year: ["2014", "Present"],
    model_type: "XUV 700 MX",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Mahindra",
    model: "XUV 700",
    production_year: ["2014", "Present"],
    model_type: "XUV 700 AX3",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/42355/xuv700-exterior-left-front-three-quarter-2.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Mahindra",
    model: "XUV 700",
    production_year: ["2014", "Present"],
    model_type: "XUV 700 AX5",
    image: "https://imgd.aeplcdn.com/1056x594/n/l1fdu4a_1536427.jpg?q=75&wm=1",
  },
  {
    make: "Suzuki",
    model: "Swift",
    production_year: ["2015", "Present"],
    model_type: "Swift LXi",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/54399/exterior-right-front-three-quarter-10.jpeg?q=75&wm=1",
  },
  {
    make: "Suzuki",
    model: "Swift",
    production_year: ["2015", "Present"],
    model_type: "Swift VXi",
    image: "https://imgd.aeplcdn.com/1056x594/n/hmei4ta_1508705.jpg?q=75&wm=1",
  },
  {
    make: "Suzuki",
    model: "Baleno",
    production_year: ["2015", "Present"],
    model_type: "Baleno Sigma",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/102663/baleno-exterior-left-front-three-quarter-4.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Suzuki",
    model: "Baleno",
    production_year: ["2015", "Present"],
    model_type: "Baleno Delta",
    image: "https://imgd.aeplcdn.com/1056x594/n/gykrrua_1559473.jpg?q=75&wm=1",
  },
  {
    make: "Land Rover",
    model: "Range Rover",
    production_year: ["2010", "Present"],
    model_type: "Range Rover HSE",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/107719/new-range-rover-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Land Rover",
    model: "Range Rover",
    production_year: ["2010", "Present"],
    model_type: "Range Rover SE",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/132437/land-rover-range-rover-right-front-three-quarter14.jpeg?isig=0&wm=1&q=75",
  },
  {
    make: "Land Rover",
    model: "Range Rover",
    production_year: ["2010", "Present"],
    model_type: "Range Rover Autobiography",
    image: "https://imgd.aeplcdn.com/1056x594/n/m76du3a_1590439.jpg?q=75&wm=1",
  },
  {
    make: "Land Rover",
    model: "Defender",
    production_year: ["2010", "Present"],
    model_type: "Defender X-DYNAMIC",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/55215/exterior-right-front-three-quarter.jpeg?q=75&wm=1",
  },
  {
    make: "Land Rover",
    model: "Defender",
    production_year: ["2010", "Present"],
    model_type: "Defender XS EDITION",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/131681/land-rover-defender-right-front-three-quarter28.jpeg?isig=0&wm=1&q=75",
  },
  {
    make: "Morris Garages",
    model: "Hector",
    production_year: ["2010", "Present"],
    model_type: "Hector 1.5 Petrol Hybrid",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/130583/hector-facelift-exterior-right-front-three-quarter-3.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Morris Garages",
    model: "Hector",
    production_year: ["2010", "Present"],
    model_type: "Hector 2.0 Diesel Smart",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/130583/hector-facelift-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Morris Garages",
    model: "Astor",
    production_year: ["2010", "Present"],
    model_type: "Astor Style",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/51940/astor-exterior-right-front-three-quarter.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Morris Garages",
    model: "Astor",
    production_year: ["2010", "Present"],
    model_type: "Astor Super",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/51940/astor-exterior-right-front-three-quarter.jpeg?isig=0&q=75&wm=2",
  },
  {
    make: "Kia",
    model: "Seltos",
    production_year: ["2010", "Present"],
    model_type: "Seltos HTE",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/115501/seltos-exterior-right-front-three-quarter.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Kia",
    model: "Seltos",
    production_year: ["2010", "Present"],
    model_type: "Seltos HTK +",
    image: "https://imgd.aeplcdn.com/1056x594/n/ryfjc3a_1569067.jpg?q=75&wm=1",
  },
  {
    make: "Kia",
    model: "Sonet",
    production_year: ["2010", "Present"],
    model_type: "Sonet HTX",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/115451/sonet-exterior-right-front-three-quarter.jpeg?isig=0&q=75&wm=1",
  },
  {
    make: "Kia",
    model: "Sonet",
    production_year: ["2010", "Present"],
    model_type: "Sonet HTX AE",
    image: "https://imgd.aeplcdn.com/1056x594/n/gvqpe3a_1571121.jpg?q=75&wm=1",
  },
  {
    make: "Toyota",
    model: "Fortuner",
    production_year: ["2010", "Present"],
    model_type: "Fortuner 4x2 2.7 Petrol",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/44709/fortuner-exterior-left-front-three-quarter.jpeg?q=75&wm=1",
  },
  {
    make: "Toyota",
    model: "Fortuner",
    production_year: ["2010", "Present"],
    model_type: "Fortuner 4x2 2.8 Diesel",
    image: "https://imgd.aeplcdn.com/1056x594/n/ofqknta_1500711.jpg?q=75&wm=1",
  },
  {
    make: "Toyota",
    model: "Fortuner",
    production_year: ["2010", "Present"],
    model_type: "Fortuner Legender",
    image:
      "https://imgd.aeplcdn.com/1056x594/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-19.jpeg?q=75&wm=1",
  },
];

module.exports = carsList;
