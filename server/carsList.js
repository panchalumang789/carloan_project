const carsList = [
  {
    make: "Tata",
    model: "Harrier",
    production_year: ["2018", "Present"],
    model_type: "Harrier XE",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&s",
  },
  {
    make: "Tata",
    model: "Harrier",
    production_year: ["2018", "2022"],
    model_type: "Harrier XM",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sa",
  },
  {
    make: "Tata",
    model: "Harrier",
    production_year: ["2018", "Present"],
    model_type: "Harrier XMS",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&saz",
  },
  {
    make: "Tata",
    model: "Safari",
    production_year: ["2010", "2020"],
    model_type: "Safari XM",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&saa",
  },
  {
    make: "Tata",
    model: "Safari",
    production_year: ["2012", "2022"],
    model_type: "Safari XMS",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&saaa",
  },
  {
    make: "Hyundai",
    model: "i10",
    production_year: ["2011", "Present"],
    model_type: "i10 Grand LXI",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sb",
  },
  {
    make: "Hyundai",
    model: "i10",
    production_year: ["2011", "Present"],
    model_type: "i10 Nios LXI",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sc",
  },
  {
    make: "Hyundai",
    model: "i20",
    production_year: ["2015", "Present"],
    model_type: "i20 Sports LXI",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sd",
  },
  {
    make: "Honda",
    model: "Amaze",
    production_year: ["2014", "Present"],
    model_type: "Amaze Comfort",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&se",
  },
  {
    make: "Honda",
    model: "Amaze",
    production_year: ["2014", "2020"],
    model_type: "Amaze Sports",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sf",
  },
  {
    make: "Honda",
    model: "Honda City",
    production_year: ["2014", "Present"],
    model_type: "Honda City Comfort",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sea",
  },
  {
    make: "Honda",
    model: "Honda City",
    production_year: ["2014", "2020"],
    model_type: "Honda City Sports",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sfb",
  },
  {
    make: "Mahindra",
    model: "Thar",
    production_year: ["2014", "Present"],
    model_type: "Thar AX OPT",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sec",
  },
  {
    make: "Mahindra",
    model: "Thar",
    production_year: ["2014", "Present"],
    model_type: "Thar LX",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sfd",
  },
  {
    make: "Mahindra",
    model: "Scorpio",
    production_year: ["2014", "Present"],
    model_type: "Scorpio AX OPT",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&secA",
  },
  {
    make: "Mahindra",
    model: "Scorpio",
    production_year: ["2014", "Present"],
    model_type: "Scorpio LX",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sfdB",
  },
  {
    make: "Mahindra",
    model: "XUV 700",
    production_year: ["2014", "Present"],
    model_type: "XUV 700 MX",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&secC",
  },
  {
    make: "Mahindra",
    model: "XUV 700",
    production_year: ["2014", "Present"],
    model_type: "XUV 700 AX3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sfdD",
  },
  {
    make: "Mahindra",
    model: "XUV 700",
    production_year: ["2014", "Present"],
    model_type: "XUV 700 AX5",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sfde",
  },
  {
    make: "Suzuki",
    model: "Swift",
    production_year: ["2015", "Present"],
    model_type: "Swift LXI",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sg",
  },
  {
    make: "Suzuki",
    model: "Alto  800",
    production_year: ["2010", "Present"],
    model_type: "Alto 800 LXI",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sh",
  },
  {
    make: "Land Rover",
    model: "Range Rover",
    production_year: ["2010", "Present"],
    model_type: "Range Rover HSE",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sha",
  },
  {
    make: "Land Rover",
    model: "Range Rover",
    production_year: ["2010", "Present"],
    model_type: "Range Rover SE",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shb",
  },
  {
    make: "Land Rover",
    model: "Defender",
    production_year: ["2010", "Present"],
    model_type: "Defender X-DYNAMIC",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shaa",
  },
  {
    make: "Land Rover",
    model: "Defender",
    production_year: ["2010", "Present"],
    model_type: "Defender XS EDITION",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shba",
  },
  {
    make: "Morris Garages",
    model: "Hector",
    production_year: ["2010", "Present"],
    model_type: "Hector 1.5 Petrol Hybrid",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&sha1",
  },
  {
    make: "Morris Garages",
    model: "Hector",
    production_year: ["2010", "Present"],
    model_type: "Hector 2.0 Diesel Smart",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shb2",
  },
  {
    make: "Morris Garages",
    model: "Astor",
    production_year: ["2010", "Present"],
    model_type: "Astor Style",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shaa3",
  },
  {
    make: "Morris Garages",
    model: "Astor",
    production_year: ["2010", "Present"],
    model_type: "Astor Super",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shba4",
  },
  {
    make: "Kia",
    model: "Seltos",
    production_year: ["2010", "Present"],
    model_type: "Seltos HTE",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shaa1",
  },
  {
    make: "Kia",
    model: "Seltos",
    production_year: ["2010", "Present"],
    model_type: "Seltos HTK +",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shba2",
  },
  {
    make: "Kia",
    model: "Sonet",
    production_year: ["2010", "Present"],
    model_type: "Sonet HTX",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shaax3",
  },
  {
    make: "Kia",
    model: "Sonet",
    production_year: ["2010", "Present"],
    model_type: "Sonet HTX AE",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shbad  4",
  },
  {
    make: "Toyota",
    model: "Fortuner",
    production_year: ["2010", "Present"],
    model_type: "Fortuner Legender",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shbad42",
  },
  {
    make: "Toyota",
    model: "Fortuner",
    production_year: ["2010", "Present"],
    model_type: "Fortuner 4x4 Wheel Drive",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdg_r2ehhWO3emacprRUqvbSDmfhzmF5oW5edkfxCz5eQ&shaax31",
  },
];

module.exports = carsList;
