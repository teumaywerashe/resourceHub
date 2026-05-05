import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";
import { universityModel } from "./models/univeristyModel.js";
import { campusModel } from "./models/campusModel.js";
import { newsModel } from "./models/newsModule.js";
import { resourceModel } from "./models/resourcesModel.js";
import { userModel } from "./models/userModel.js";
import { adminModel } from "./models/adminModel.js";
import "dotenv/config";

const MONGO_URL = process.env.MONGO_URL;

// ─── Universities ────────────────────────────────────────────────────────────
const universities = [
  {
    logo: "addisAbabaUni.jpg",
    name: "Addis Ababa University",
    generation: "1st",
    region: "Addis Ababa",
    foundCity: "Addis Ababa",
    description:
      "The oldest and largest university in Ethiopia, founded in 1950. It is a leading research and teaching institution in East Africa.",
    establishedYear: "1950",
    contact: {
      address: "P.O. Box 1176, Addis Ababa",
      phone1: "+251-111-239-701",
      email1: "info@aau.edu.et",
      website: "https://www.aau.edu.et",
      facebook: "https://facebook.com/aau.edu.et",
    },
  },
  {
    logo: "mekeleUnivi.jpg",
    name: "Mekelle University",
    generation: "2nd",
    region: "Tigray",
    foundCity: "Mekelle",
    description:
      "A public research university located in Mekelle, Tigray. Established in 1991, it is one of the major universities in northern Ethiopia.",
    establishedYear: "1991",
    contact: {
      address: "P.O. Box 231, Mekelle",
      phone1: "+251-344-416-683",
      email1: "info@mu.edu.et",
      website: "https://www.mu.edu.et",
    },
  },
  {
    logo: "bahirdar uni.jpg",
    name: "Bahir Dar University",
    generation: "2nd",
    region: "Amhara",
    foundCity: "Bahir Dar",
    description:
      "Located on the shores of Lake Tana, Bahir Dar University is one of the fastest-growing universities in Ethiopia, known for its engineering and technology programs.",
    establishedYear: "2000",
    contact: {
      address: "P.O. Box 79, Bahir Dar",
      phone1: "+251-582-200-747",
      email1: "info@bdu.edu.et",
      website: "https://www.bdu.edu.et",
    },
  },
  {
    logo: "haramayaUni.jpg",
    name: "Haramaya University",
    generation: "1st",
    region: "Oromia",
    foundCity: "Haramaya",
    description:
      "One of the oldest universities in Ethiopia, established in 1954. It is renowned for its agriculture and natural resource programs.",
    establishedYear: "1954",
    contact: {
      address: "P.O. Box 138, Dire Dawa",
      phone1: "+251-255-530-399",
      email1: "info@haramaya.edu.et",
      website: "https://www.haramaya.edu.et",
    },
  },
  {
    logo: "wollo-university.jpg",
    name: "Wollo University",
    generation: "3rd",
    region: "Amhara",
    foundCity: "Dessie",
    description:
      "Wollo University is a public university located in Dessie, South Wollo Zone. It offers programs in engineering, natural sciences, social sciences, and health.",
    establishedYear: "2007",
    contact: {
      address: "P.O. Box 1145, Dessie",
      phone1: "+251-331-117-351",
      email1: "info@wu.edu.et",
      website: "https://www.wu.edu.et",
    },
  },
];

// ─── Seed function ────────────────────────────────────────────────────────────
async function seed() {
  await connectDB(MONGO_URL);
  // give the connection a moment to establish
  await new Promise((r) => setTimeout(r, 2000));

  // Clear existing data
  await Promise.all([
    universityModel.deleteMany({}),
    campusModel.deleteMany({}),
    newsModel.deleteMany({}),
    resourceModel.deleteMany({}),
    userModel.deleteMany({}),
    adminModel.deleteMany({}),
  ]);
  console.log("Cleared existing data");

  // ── Insert universities ──────────────────────────────────────────────────
  const insertedUnis = await universityModel.insertMany(universities);
  console.log(`Inserted ${insertedUnis.length} universities`);

  const [aau, mu, bdu, hu, wu] = insertedUnis.map((u) => u._id.toString());

  // ── Campuses ─────────────────────────────────────────────────────────────
  const campuses = [
    {
      name: "Main Campus",
      logo: "AAIT.jpg",
      uniId: aau,
      description: "The main campus of Addis Ababa University located at 4 Kilo.",
      departments: {
        "College of Natural and Computational Sciences": [
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Computer Science",
        ],
        "College of Social Sciences": ["History", "Geography", "Sociology"],
      },
    },
    {
      name: "Arada Campus",
      logo: "ARID.jpg",
      uniId: aau,
      description: "Home to the College of Business and Economics at AAU.",
      departments: {
        "College of Business and Economics": [
          "Accounting",
          "Management",
          "Economics",
        ],
      },
    },
    {
      name: "Adi Haqi Campus",
      logo: "ADIHAKI.jpg",
      uniId: mu,
      description: "The main campus of Mekelle University hosting engineering and technology colleges.",
      departments: {
        "College of Engineering and Technology": [
          "Civil Engineering",
          "Electrical Engineering",
          "Mechanical Engineering",
        ],
        "College of Business and Economics": ["Accounting", "Management"],
      },
    },
    {
      name: "Peda Campus",
      logo: "MIT.jpg",
      uniId: bdu,
      description: "Bahir Dar University's education campus offering teacher training programs.",
      departments: {
        "College of Education": [
          "Curriculum Studies",
          "Educational Psychology",
          "Special Needs Education",
        ],
      },
    },
    {
      name: "Main Campus",
      logo: "haramayaUni.jpg",
      uniId: hu,
      description: "The central campus of Haramaya University with agriculture and veterinary colleges.",
      departments: {
        "College of Agriculture and Environmental Sciences": [
          "Plant Sciences",
          "Animal Sciences",
          "Soil Science",
        ],
        "College of Veterinary Medicine": ["Veterinary Medicine"],
      },
    },
  ];

  const insertedCampuses = await campusModel.insertMany(campuses);
  console.log(`Inserted ${insertedCampuses.length} campuses`);

  const [mainAAU, aradaAAU, adiHaqiMU, pedaBDU, mainHU] = insertedCampuses.map(
    (c) => c._id.toString()
  );

  // ── News ──────────────────────────────────────────────────────────────────
  const news = [
    {
      uniId: aau,
      title: "AAU Launches New AI Research Center",
      content:
        "Addis Ababa University has officially launched a state-of-the-art Artificial Intelligence Research Center aimed at fostering innovation and technology development in Ethiopia.",
      category: "Research",
      expired: false,
    },
    {
      uniId: mu,
      title: "Mekelle University Hosts National Science Fair",
      content:
        "Mekelle University successfully hosted the 12th National Science and Technology Fair, attracting over 500 student participants from universities across Ethiopia.",
      category: "Event",
      expired: false,
    },
    {
      uniId: bdu,
      title: "Bahir Dar University Signs MoU with German University",
      content:
        "Bahir Dar University has signed a Memorandum of Understanding with the Technical University of Munich to promote academic exchange and joint research programs.",
      category: "Partnership",
      expired: false,
    },
    {
      uniId: hu,
      title: "Haramaya University Celebrates 70th Anniversary",
      content:
        "Haramaya University marked its 70th founding anniversary with a week-long celebration featuring academic conferences, cultural events, and alumni reunions.",
      category: "Announcement",
      expired: false,
    },
    {
      uniId: wu,
      title: "Wollo University Opens New Engineering Building",
      content:
        "Wollo University inaugurated a newly constructed engineering faculty building equipped with modern laboratories and smart classrooms to enhance student learning.",
      category: "Infrastructure",
      expired: false,
    },
  ];

  const insertedNews = await newsModel.insertMany(news);
  console.log(`Inserted ${insertedNews.length} news items`);

  // ── Resources ─────────────────────────────────────────────────────────────
  const resources = [
    {
      campusId: mainAAU,
      departName: "Computer Science",
      title: "Introduction to Algorithms - Lecture Notes",
      description: "Comprehensive lecture notes covering sorting, searching, and graph algorithms.",
      type: "module",
      fileType: "pdf",
      file: "algorithms_notes.pdf",
      uploadedBy: "Dr. Abebe Girma",
      uniId: aau,
    },
    {
      campusId: mainAAU,
      departName: "Mathematics",
      title: "Calculus II Past Exam 2023",
      description: "Past examination paper for Calculus II with solutions.",
      type: "exam",
      fileType: "pdf",
      file: "calculus2_exam_2023.pdf",
      uploadedBy: "Prof. Tigist Haile",
      uniId: aau,
    },
    {
      campusId: adiHaqiMU,
      departName: "Civil Engineering",
      title: "Structural Analysis Reference Book",
      description: "A reference textbook on structural analysis methods used in civil engineering.",
      type: "reference",
      fileType: "pdf",
      file: "structural_analysis_ref.pdf",
      uploadedBy: "Dr. Yohannes Tekle",
      uniId: mu,
    },
    {
      campusId: pedaBDU,
      departName: "Educational Psychology",
      title: "Child Development Module",
      description: "Module covering theories of child development and their educational implications.",
      type: "module",
      fileType: "pdf",
      file: "child_development_module.pdf",
      uploadedBy: "Ato Mulugeta Assefa",
      uniId: bdu,
    },
    {
      campusId: mainHU,
      departName: "Plant Sciences",
      title: "Crop Production Techniques - Study Guide",
      description: "Study guide on modern crop production and soil management techniques.",
      type: "reference",
      fileType: "pdf",
      file: "crop_production_guide.pdf",
      uploadedBy: "Dr. Selamawit Bekele",
      uniId: hu,
    },
  ];

  const insertedResources = await resourceModel.insertMany(resources);
  console.log(`Inserted ${insertedResources.length} resources`);

  // ── Users ─────────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = [
    { name: "Abebe Kebede", email: "abebe@example.com", password: hashedPassword },
    { name: "Tigist Alemu", email: "tigist@example.com", password: hashedPassword },
    { name: "Dawit Tesfaye", email: "dawit@example.com", password: hashedPassword },
    { name: "Hiwot Girma", email: "hiwot@example.com", password: hashedPassword },
    { name: "Yonas Hailu", email: "yonas@example.com", password: hashedPassword },
  ];

  const insertedUsers = await userModel.insertMany(users);
  console.log(`Inserted ${insertedUsers.length} users`);

  // ── Admins ────────────────────────────────────────────────────────────────
  const admins = [
    { name: "Super Admin", email: "superadmin@resourcehub.et", password: hashedPassword, university: "all" },
    { name: "AAU Admin", email: "admin@aau.edu.et", password: hashedPassword, university: aau },
    { name: "MU Admin", email: "admin@mu.edu.et", password: hashedPassword, university: mu },
    { name: "BDU Admin", email: "admin@bdu.edu.et", password: hashedPassword, university: bdu },
    { name: "HU Admin", email: "admin@haramaya.edu.et", password: hashedPassword, university: hu },
  ];

  const insertedAdmins = await adminModel.insertMany(admins);
  console.log(`Inserted ${insertedAdmins.length} admins`);

  console.log("\n✅ Seeding complete!");
  console.log("Default password for all users/admins: password123");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
