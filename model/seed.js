const { insertRoleToDb } = require("./rolesOrm");
const { insertUserToDb } = require("./userOrm");
const { insertCompanyToDb } = require("./companyOrm");
const { insertFloorToDb } = require("./floorOrm");
const { insertBuildingToDb } = require("./buildingOrm");
const { insertDeskToDb } = require("./deskOrm");
const { insertChairToDb } = require("./chairOrm");
const { insertOccupancyToDb } = require("./occupancyOrm");
const fake = require("faker");

async function seed() {
  // add role
  console.log("adding roles...");
  const roleAdmin = await insertRoleToDb("admin");
  const roleUser = await insertRoleToDb("user");

  console.log("adding companies");
  // add company
  const seedACompany = await insertCompanyToDb("Seed A Company");
  const seedBCompany = await insertCompanyToDb("Seed B Company");

  console.log("adding buildings");
  //add building
  const seedABuilding = await insertBuildingToDb("Seed A");
  const seedBBuilding = await insertBuildingToDb("Seed B");

  console.log("adding users");
  // add user
  const userAAdmin = await insertUserToDb(
    "adminA",
    "password",
    roleAdmin.id,
    seedACompany.id
  );
  const userBAdmin = await insertUserToDb(
    "adminB",
    "password",
    roleAdmin.id,
    seedBCompany.id
  );

  const regUserA1 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedACompany.id
  );
  const regUserA2 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedACompany.id
  );
  const regUserA3 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedACompany.id
  );
  const regUserA4 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedACompany.id
  );
  const regUserA5 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedACompany.id
  );
  const regUserA6 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedACompany.id
  );
  const regUserA7 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedACompany.id
  );
  const regUserA8 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedACompany.id
  );

  const regUserB1 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedBCompany.id
  );
  const regUserB2 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedBCompany.id
  );
  const regUserB3 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedBCompany.id
  );
  const regUserB4 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedBCompany.id
  );
  const regUserB5 = await insertUserToDb(
    fake.name.firstName(),
    "password",
    roleUser.id,
    seedBCompany.id
  );

  console.log("adding floors");
  // add floor
  const seedAFloorA = await insertFloorToDb(
    seedACompany.id,
    seedABuilding.id,
    "AA",
    2
  );
  const seedAFloorB = await insertFloorToDb(
    seedACompany.id,
    seedABuilding.id,
    "AB",
    3
  );
  const seedBFloorA = await insertFloorToDb(
    seedBCompany.id,
    seedBBuilding.id,
    "BA",
    4
  );

  console.log("adding desks");
  // add desk
  const seedAFloorADesk1 = await insertDeskToDb(seedAFloorA.id, "AA1", 3);

  const seedAFloorBDesk1 = await insertDeskToDb(seedAFloorB.id, "AB1", 2);
  const seedAFloorBDesk2 = await insertDeskToDb(seedAFloorB.id, "AB2", 3);
  const seedAFloorBDesk3 = await insertDeskToDb(seedAFloorB.id, "AB3", 2);

  const seedBFloorADesk1 = await insertDeskToDb(seedBFloorA.id, "BA1", 3);
  const seedBFloorADesk2 = await insertDeskToDb(seedBFloorA.id, "BA2", 2);

  console.log("adding chairs");
  // add chair
  const AA1Chair1 = await insertChairToDb(seedAFloorADesk1.id, "AA11");
  const AA1Chair2 = await insertChairToDb(seedAFloorADesk1.id, "AA12");

  const AB1Chair1 = await insertChairToDb(seedAFloorBDesk1.id, "AB11");
  const AB1Chair2 = await insertChairToDb(seedAFloorBDesk1.id, "AB12");

  const AB2Chair1 = await insertChairToDb(seedAFloorBDesk2.id, "AB21");
  const AB2Chair2 = await insertChairToDb(seedAFloorBDesk2.id, "AB22");
  const AB2Chair3 = await insertChairToDb(seedAFloorBDesk2.id, "AB23");

  const AB3Chair1 = await insertChairToDb(seedAFloorBDesk3.id, "AB31");

  const BA1Chair1 = await insertChairToDb(seedBFloorADesk1.id, "BA11");
  const BA1Chair2 = await insertChairToDb(seedBFloorADesk1.id, "BA12");
  const BA1Chair3 = await insertChairToDb(seedBFloorADesk1.id, "BA13");

  const BA2Chair1 = await insertChairToDb(seedBFloorADesk2.id, "BA21");
  const BA2Chair2 = await insertChairToDb(seedBFloorADesk2.id, "BA22");

  console.log("sitting users down");
  const convertDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let day = date.getDate();
    if (day.toString().length == 1) {
      day = `0${day}`;
    }
    return [year, month, day].join("-");
  };
  const date = new Date();
  const date1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const date2 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 1
  );
  const d1 = convertDate(date1);
  const d2 = convertDate(date2);
  const AA11 = await insertOccupancyToDb(d1, AA1Chair1.id, regUserA1.id);
  // const AA12 = await insertOccupancyToDb(d2, AA1Chair2.id, regUserA2.id);
  const AB11 = await insertOccupancyToDb(d1, AB1Chair1.id, regUserA3.id);
  // const AB12 = await insertOccupancyToDb(d2, AB1Chair2.id, regUserA4.id);
  // const AB21 = await insertOccupancyToDb(d1, AB2Chair1.id, regUserA5.id);
  // const AB22 = await insertOccupancyToDb(d2, AB2Chair2.id, regUserA6.id);
  const AB23 = await insertOccupancyToDb(d1, AB2Chair3.id, regUserA7.id);
  const AB31 = await insertOccupancyToDb(d2, AB3Chair1.id, regUserA8.id);
  const BA11 = await insertOccupancyToDb(d1, BA1Chair1.id, regUserB1.id);
  const BA12 = await insertOccupancyToDb(d2, BA1Chair2.id, regUserB2.id);
  // const BA13 = await insertOccupancyToDb(d1, BA1Chair3.id, regUserB3.id);
  // const BA21 = await insertOccupancyToDb(d2, BA2Chair1.id, regUserB4.id);
  const BA22 = await insertOccupancyToDb(d1, BA2Chair2.id, regUserB5.id);
  console.log("done");
  return;
}

seed();
