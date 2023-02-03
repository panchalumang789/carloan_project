const carsList = [
  {
    make: "Tata",
    model: "Harrier",
    production_year: ["2018", "Present"],
    model_type: "Harrier XE",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/1.webp?alt=media&token=fb54d736-e613-4feb-963b-c22977c78114",
  },
  {
    make: "Tata",
    model: "Harrier",
    production_year: ["2018", "2022"],
    model_type: "Harrier XM",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/2.webp?alt=media&token=d1ac2c9d-20fc-466c-b028-51c9aea8b0b7",
  },
  {
    make: "Tata",
    model: "Harrier",
    production_year: ["2018", "Present"],
    model_type: "Harrier XMS",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/41.webp?alt=media&token=44aa430e-31f4-4685-a5ff-80d35463176a",
  },
  {
    make: "Tata",
    model: "Safari",
    production_year: ["2010", "2020"],
    model_type: "Safari XM",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/4.webp?alt=media&token=c4c16bd8-5371-4a3d-ac87-b2b690b06f5d",
  },
  {
    make: "Tata",
    model: "Safari",
    production_year: ["2012", "2022"],
    model_type: "Safari XMS",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/5.webp?alt=media&token=eb8a0c82-c16d-4da4-b5f9-3dc70d4dea71",
  },
  {
    make: "Hyundai",
    model: "i10",
    production_year: ["2011", "Present"],
    model_type: "i10 Grand LXi",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/6.webp?alt=media&token=4a97cdc8-c124-45e9-aea1-fe6c6d709280",
  },
  {
    make: "Hyundai",
    model: "i10",
    production_year: ["2011", "Present"],
    model_type: "i10 Nios LXi",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/7.webp?alt=media&token=73d7627f-acac-4649-879a-1f5d0e82c460",
  },
  {
    make: "Hyundai",
    model: "i20",
    production_year: ["2015", "Present"],
    model_type: "i20 Sports MT Sportz",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/8.webp?alt=media&token=74c6e071-8f78-4e79-852d-014da2995524",
  },
  {
    make: "Hyundai",
    model: "i20",
    production_year: ["2015", "Present"],
    model_type: "i20 Sports MT Asta",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/9.webp?alt=media&token=20a603f3-3914-4a35-97d4-18c8b5b5fef3",
  },
  {
    make: "Honda",
    model: "Amaze",
    production_year: ["2014", "Present"],
    model_type: "Amaze S MT",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/10.webp?alt=media&token=297c0bf3-be75-4f3c-b8cf-a54992bf6db2",
  },
  {
    make: "Honda",
    model: "Amaze",
    production_year: ["2014", "2020"],
    model_type: "Amaze VX MT",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/11.webp?alt=media&token=087ba754-e28f-4991-b7a2-8c4470fec2e8",
  },
  {
    make: "Honda",
    model: "Honda City",
    production_year: ["2014", "Present"],
    model_type: "Honda City V CVT",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/12.webp?alt=media&token=2c203055-3a6d-49d6-bd58-1165fe6fcea4",
  },
  {
    make: "Honda",
    model: "Honda City",
    production_year: ["2014", "2020"],
    model_type: "Honda City VX Petrol",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/43.jpg?alt=media&token=1d54ecc5-4cdc-4b3e-8bc5-6ecddb890c2e",
  },
  {
    make: "Mahindra",
    model: "Thar",
    production_year: ["2014", "Present"],
    model_type: "Thar AX OPT",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/42.jpg?alt=media&token=6752dd80-c64f-4f4b-ba81-5ce8ccfdd031",
  },
  {
    make: "Mahindra",
    model: "Thar",
    production_year: ["2014", "Present"],
    model_type: "Thar LX",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/15.webp?alt=media&token=e07aceb3-9f62-49c9-b827-b56eabd488ae",
  },
  {
    make: "Mahindra",
    model: "Scorpio",
    production_year: ["2014", "Present"],
    model_type: "Scorpio AX OPT",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/16.webp?alt=media&token=5c217267-38c4-4077-abcf-59a69cb57e69",
  },
  {
    make: "Mahindra",
    model: "Scorpio",
    production_year: ["2014", "Present"],
    model_type: "Scorpio LX",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/17.webp?alt=media&token=231a2f48-7c8b-4428-8e5c-8a52d25bacef",
  },
  {
    make: "Mahindra",
    model: "XUV 700",
    production_year: ["2014", "Present"],
    model_type: "XUV 700 MX",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/18.webp?alt=media&token=7f3a0090-aa29-436a-9de3-19a05b14be0a",
  },
  {
    make: "Mahindra",
    model: "XUV 700",
    production_year: ["2014", "Present"],
    model_type: "XUV 700 AX3",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/45.png?alt=media&token=17d1b2de-a3c5-44ce-b937-97245e92da7e",
  },
  {
    make: "Mahindra",
    model: "XUV 700",
    production_year: ["2014", "Present"],
    model_type: "XUV 700 AX5",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/20.webp?alt=media&token=3ad61aa3-8acc-40bc-aea3-5b705611bcf9",
  },
  {
    make: "Suzuki",
    model: "Swift",
    production_year: ["2015", "Present"],
    model_type: "Swift LXi",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/21.webp?alt=media&token=9c46a2c5-5d73-480a-b7f4-58addce6929a",
  },
  {
    make: "Suzuki",
    model: "Swift",
    production_year: ["2015", "Present"],
    model_type: "Swift VXi",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/22.webp?alt=media&token=d4734f54-6785-44b8-ac1c-30894606e2e8",
  },
  {
    make: "Suzuki",
    model: "Baleno",
    production_year: ["2015", "Present"],
    model_type: "Baleno Sigma",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/46.jpg?alt=media&token=0b3e75ab-dd67-4cb7-aa1e-63fa47b31a02",
  },
  {
    make: "Suzuki",
    model: "Baleno",
    production_year: ["2015", "Present"],
    model_type: "Baleno Delta",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/24.webp?alt=media&token=55750db2-7a53-430e-9a09-0344632a5b9b",
  },
  {
    make: "Land Rover",
    model: "Range Rover",
    production_year: ["2010", "Present"],
    model_type: "Range Rover HSE",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/25.webp?alt=media&token=8d540326-0e93-4331-a3eb-d726965a606c",
  },
  {
    make: "Land Rover",
    model: "Range Rover",
    production_year: ["2010", "Present"],
    model_type: "Range Rover SE",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/44.webp?alt=media&token=84b37621-2e25-4962-a17f-1e399d2e8ff3",
  },
  {
    make: "Land Rover",
    model: "Range Rover",
    production_year: ["2010", "Present"],
    model_type: "Range Rover Autobiography",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/27.webp?alt=media&token=4ed38f4d-2310-47cb-b7a4-5799784a4582",
  },
  {
    make: "Land Rover",
    model: "Defender",
    production_year: ["2010", "Present"],
    model_type: "Defender X-DYNAMIC",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/28.webp?alt=media&token=d5996940-5ce3-44fc-a5fb-e442ea1b26e6",
  },
  {
    make: "Land Rover",
    model: "Defender",
    production_year: ["2010", "Present"],
    model_type: "Defender XS EDITION",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/47.jpg?alt=media&token=203e1c27-8d7d-4dcd-83d7-ccd3e670a8de",
  },
  {
    make: "Morris Garages",
    model: "Hector",
    production_year: ["2010", "Present"],
    model_type: "Hector 1.5 Petrol Hybrid",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/30.webp?alt=media&token=23917313-b056-4728-8b5b-24f1280cbb6c",
  },
  {
    make: "Morris Garages",
    model: "Hector",
    production_year: ["2010", "Present"],
    model_type: "Hector 2.0 Diesel Smart",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/31.webp?alt=media&token=6b7fe6f0-8fe5-4ff7-8b7e-778a35ef980d",
  },
  {
    make: "Morris Garages",
    model: "Astor",
    production_year: ["2010", "Present"],
    model_type: "Astor Style",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/32.webp?alt=media&token=ea8b6f79-16fc-4585-8594-7f1469256809",
  },
  {
    make: "Morris Garages",
    model: "Astor",
    production_year: ["2010", "Present"],
    model_type: "Astor Super",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/33.webp?alt=media&token=6314ff6f-b536-4f94-9725-9363eb577a9f",
  },
  {
    make: "Kia",
    model: "Seltos",
    production_year: ["2010", "Present"],
    model_type: "Seltos HTE",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/34.webp?alt=media&token=b8aba1ed-0139-4233-8d88-c40e5178efa3",
  },
  {
    make: "Kia",
    model: "Seltos",
    production_year: ["2010", "Present"],
    model_type: "Seltos HTK +",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/35.webp?alt=media&token=4f3bcc69-8c3b-4b01-a316-5a3f8d4437dc",
  },
  {
    make: "Kia",
    model: "Sonet",
    production_year: ["2010", "Present"],
    model_type: "Sonet HTX",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/36.webp?alt=media&token=00bc501e-89ff-41ea-9399-79b5c40115c3",
  },
  {
    make: "Kia",
    model: "Sonet",
    production_year: ["2010", "Present"],
    model_type: "Sonet HTX AE",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/37.webp?alt=media&token=d877b2f8-322d-4622-84c7-6781f36d7099",
  },
  {
    make: "Toyota",
    model: "Fortuner",
    production_year: ["2010", "Present"],
    model_type: "Fortuner 4x2 2.7 Petrol",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/40.webp?alt=media&token=f74ba6b6-d925-4b48-8a50-860af178fcee",
  },
  {
    make: "Toyota",
    model: "Fortuner",
    production_year: ["2010", "Present"],
    model_type: "Fortuner 4x2 2.8 Diesel",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/39.webp?alt=media&token=cd58ff6b-f98d-438e-942c-482ba8ecc8b7",
  },
  {
    make: "Toyota",
    model: "Fortuner",
    production_year: ["2010", "Present"],
    model_type: "Fortuner Legender",
    image:
      "https://firebasestorage.googleapis.com/v0/b/carloan-e4e53.appspot.com/o/48.jpg?alt=media&token=43cea973-d04d-4d82-ba31-12a5868c7718",
  },
];

module.exports = carsList;
