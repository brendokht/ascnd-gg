/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, InviteStatus } from "../";

const prisma = new PrismaClient();

// TODO: Add data to accounts, after adding magic link authentication
async function main() {
  // #region Users
  const owner = await prisma.user.upsert({
    where: { id: "0199ad03-7954-7f3d-acbd-c9cc91150e21" },
    update: {
      email: "owner@test.com",
      emailVerified: true,
      name: "Team Owner",
      username: "teamowner",
      displayUsername: "TeamOwner",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad03-7954-7f3d-acbd-c9cc91150e21",
      email: "owner@test.com",
      emailVerified: true,
      name: "Team Owner",
      username: "teamowner",
      displayUsername: "TeamOwner",
      active: true,
    },
  });

  const member = await prisma.user.upsert({
    where: { id: "0199ad04-15f8-74a3-8f33-07d328debc4c" },
    update: {
      email: "member@test.com",
      emailVerified: true,
      name: "Member User",
      username: "memberuser",
      displayUsername: "memberuser",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad04-15f8-74a3-8f33-07d328debc4c",
      email: "member@test.com",
      emailVerified: true,
      name: "Member User",
      username: "memberuser",
      displayUsername: "memberuser",
      active: true,
    },
  });

  const userA = await prisma.user.upsert({
    where: { id: "0199ad04-57b0-765b-a206-bb4cb040cadc" },
    update: {
      email: "alice@test.com",
      emailVerified: true,
      name: "Alice Moreno",
      username: "a1iceblitz",
      displayUsername: "A1iceBlitz",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad04-57b0-765b-a206-bb4cb040cadc",
      email: "alice@test.com",
      emailVerified: true,
      name: "Alice Moreno",
      username: "a1iceblitz",
      displayUsername: "A1iceBlitz",
      active: true,
    },
  });

  const userB = await prisma.user.upsert({
    where: { id: "0199ad04-b52a-71d6-af48-0bac4ad520b9" },
    update: {
      email: "bob@test.com",
      emailVerified: true,
      name: "Robert Barnes",
      username: "riftranger",
      displayUsername: "RiftRanger",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad04-b52a-71d6-af48-0bac4ad520b9",
      email: "bob@test.com",
      emailVerified: true,
      name: "Robert Barnes",
      username: "riftranger",
      displayUsername: "RiftRanger",
      active: true,
    },
  });

  const userC = await prisma.user.upsert({
    where: { id: "0199ad04-eaef-7f6c-9a13-200fee4677a7" },
    update: {
      email: "charlie@test.com",
      emailVerified: true,
      name: "Charles Miller",
      username: "cha0scharlie",
      displayUsername: "Cha0sCharlie",
      active: false,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad04-eaef-7f6c-9a13-200fee4677a7",
      email: "charlie@test.com",
      emailVerified: true,
      name: "Charles Miller",
      username: "cha0scharlie",
      displayUsername: "Cha0sCharlie",
      active: false,
    },
  });

  const userD = await prisma.user.upsert({
    where: { id: "0199ad3a-9874-789e-a02f-5914cd8ed645" },
    update: {
      email: "devon@test.com",
      emailVerified: true,
      name: "Devon Tanner",
      username: "dev0nx",
      displayUsername: "Dev0nX",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3a-9874-789e-a02f-5914cd8ed645",
      email: "devon@test.com",
      emailVerified: true,
      name: "Devon Tanner",
      username: "dev0nx",
      displayUsername: "Dev0nX",
      active: true,
    },
  });

  const userE = await prisma.user.upsert({
    where: { id: "0199ad3a-bd08-7e49-ab23-063e8566eae0" },
    update: {
      email: "easton@test.com",
      emailVerified: true,
      name: "Easton Hale",
      username: "eastsidex",
      displayUsername: "EastSideX",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3a-bd08-7e49-ab23-063e8566eae0",
      email: "easton@test.com",
      emailVerified: true,
      name: "Easton Hale",
      username: "eastsidex",
      displayUsername: "EastSideX",
      active: true,
    },
  });

  const userF = await prisma.user.upsert({
    where: { id: "0199ad3b-07d9-7adb-b176-a2393f7d9641" },
    update: {
      email: "patrick@test.com",
      emailVerified: true,
      name: "Patrick Fenton",
      username: "fentstrike",
      displayUsername: "FentStrike",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-07d9-7adb-b176-a2393f7d9641",
      email: "patrick@test.com",
      emailVerified: true,
      name: "Patrick Fenton",
      username: "fentstrike",
      displayUsername: "FentStrike",
      active: true,
    },
  });

  const userG = await prisma.user.upsert({
    where: { id: "0199ad3b-1c2d-7a01-b176-a2393f7d9642" },
    update: {
      email: "gina@test.com",
      emailVerified: true,
      name: "Gina Morales",
      username: "g1na",
      displayUsername: "G1na",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-1c2d-7a01-b176-a2393f7d9642",
      email: "gina@test.com",
      emailVerified: true,
      name: "Gina Morales",
      username: "g1na",
      displayUsername: "G1na",
      active: true,
    },
  });

  const userH = await prisma.user.upsert({
    where: { id: "0199ad3b-2d3e-7b02-b176-a2393f7d9643" },
    update: {
      email: "harry@test.com",
      emailVerified: true,
      name: "Harry Cole",
      username: "h4rryc0le",
      displayUsername: "H4RRyC0le",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-2d3e-7b02-b176-a2393f7d9643",
      email: "harry@test.com",
      emailVerified: true,
      name: "Harry Cole",
      username: "h4rryc0le",
      displayUsername: "H4RRyC0le",
      active: true,
    },
  });

  const userI = await prisma.user.upsert({
    where: { id: "0199ad3b-3e4f-7c03-b176-a2393f7d9644" },
    update: {
      email: "ingrid@test.com",
      emailVerified: true,
      name: "Ingrid Svensson",
      username: "ingridvex",
      displayUsername: "IngridVex",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-3e4f-7c03-b176-a2393f7d9644",
      email: "ingrid@test.com",
      emailVerified: true,
      name: "Ingrid Svensson",
      username: "ingridvex",
      displayUsername: "IngridVex",
      active: true,
    },
  });

  const userJ = await prisma.user.upsert({
    where: { id: "0199ad3b-4f50-7d04-b176-a2393f7d9645" },
    update: {
      email: "jason@test.com",
      emailVerified: true,
      name: "Jason Brookes",
      username: "jaxbrookes",
      displayUsername: "JaxBrookes",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-4f50-7d04-b176-a2393f7d9645",
      email: "jason@test.com",
      emailVerified: true,
      name: "Jason Brookes",
      username: "jaxbrookes",
      displayUsername: "JaxBrookes",
      active: true,
    },
  });

  const userK = await prisma.user.upsert({
    where: { id: "0199ad3b-5061-7e05-b176-a2393f7d9646" },
    update: {
      email: "karen@test.com",
      emailVerified: true,
      name: "Karen Lee",
      username: "karenade",
      displayUsername: "KareNade",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-5061-7e05-b176-a2393f7d9646",
      email: "karen@test.com",
      emailVerified: true,
      name: "Karen Lee",
      username: "karenade",
      displayUsername: "KareNade",
      active: true,
    },
  });

  const userL = await prisma.user.upsert({
    where: { id: "0199ad3b-6172-7f06-b176-a2393f7d9647" },
    update: {
      email: "luke@test.com",
      emailVerified: true,
      name: "Luke Harper",
      username: "lukesh0t",
      displayUsername: "LukeSh0t",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-6172-7f06-b176-a2393f7d9647",
      email: "luke@test.com",
      emailVerified: true,
      name: "Luke Harper",
      username: "lukesh0t",
      displayUsername: "LukeSh0t",
      active: true,
    },
  });

  const userM = await prisma.user.upsert({
    where: { id: "0199ad3b-7283-7017-b176-a2393f7d9648" },
    update: {
      email: "mia@test.com",
      emailVerified: true,
      name: "Mia Torres",
      username: "miapulse",
      displayUsername: "MiaPulse",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-7283-7017-b176-a2393f7d9648",
      email: "mia@test.com",
      emailVerified: true,
      name: "Mia Torres",
      username: "miapulse",
      displayUsername: "MiaPulse",
      active: true,
    },
  });

  const userN = await prisma.user.upsert({
    where: { id: "0199ad3b-8394-7128-b176-a2393f7d9649" },
    update: {
      email: "nate@test.com",
      emailVerified: true,
      name: "Nate Rivers",
      username: "n8rage",
      displayUsername: "N8Rage",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-8394-7128-b176-a2393f7d9649",
      email: "nate@test.com",
      emailVerified: true,
      name: "Nate Rivers",
      username: "n8rage",
      displayUsername: "N8Rage",
      active: true,
    },
  });

  const userO = await prisma.user.upsert({
    where: { id: "0199ad3b-94a5-7239-b176-a2393f7d9650" },
    update: {
      email: "olivia@test.com",
      emailVerified: true,
      name: "Olivia Park",
      username: "olivion",
      displayUsername: "Olivion",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-94a5-7239-b176-a2393f7d9650",
      email: "olivia@test.com",
      emailVerified: true,
      name: "Olivia Park",
      username: "olivion",
      displayUsername: "Olivion",
      active: true,
    },
  });

  const userP = await prisma.user.upsert({
    where: { id: "0199ad3b-a5b6-734a-b176-a2393f7d9651" },
    update: {
      email: "paul@test.com",
      emailVerified: true,
      name: "Paul Anderson",
      username: "paul0xe",
      displayUsername: "Paul0xe",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-a5b6-734a-b176-a2393f7d9651",
      email: "paul@test.com",
      emailVerified: true,
      name: "Paul Anderson",
      username: "paul0xe",
      displayUsername: "Paul0xe",
      active: true,
    },
  });

  const userQ = await prisma.user.upsert({
    where: { id: "0199ad3b-a5b6-734a-b176-a2393f7d9652" },
    update: {
      email: "quinn@test.com",
      emailVerified: true,
      name: "Quinn Storey",
      username: "quincey",
      displayUsername: "quincey",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-a5b6-734a-b176-a2393f7d9652",
      email: "quinn@test.com",
      emailVerified: true,
      name: "Quinn Storey",
      username: "quincey",
      displayUsername: "quincey",
      active: true,
    },
  });

  const userR = await prisma.user.upsert({
    where: { id: "0199ad3b-a5b6-734a-b176-a2393f7d9653" },
    update: {
      email: "riley@test.com",
      emailVerified: true,
      name: "Riley Kohut",
      username: "rileydadog",
      displayUsername: "RileyDaDog",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-a5b6-734a-b176-a2393f7d9653",
      email: "riley@test.com",
      emailVerified: true,
      name: "Riley Kohut",
      username: "rileydadog",
      displayUsername: "RileyDaDog",
      active: true,
    },
  });

  const userS = await prisma.user.upsert({
    where: { id: "0199ad3b-a5b6-734a-b176-a2393f7d9654" },
    update: {
      email: "sam@test.com",
      emailVerified: true,
      name: "Sam McPhearson",
      username: "sammickey",
      displayUsername: "SamMickey",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-a5b6-734a-b176-a2393f7d9654",
      email: "sam@test.com",
      emailVerified: true,
      name: "Sam McPhearson",
      username: "sammickey",
      displayUsername: "SamMickey",
      active: true,
    },
  });

  const userT = await prisma.user.upsert({
    where: { id: "0199ad3b-a5b6-734a-b176-a2393f7d9655" },
    update: {
      email: "terrance@test.com",
      emailVerified: true,
      name: "Terrance Johnson",
      username: "terrebear",
      displayUsername: "TerreBear",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad3b-a5b6-734a-b176-a2393f7d9655",
      email: "terrance@test.com",
      emailVerified: true,
      name: "Terrance Johnson",
      username: "terrebear",
      displayUsername: "TerreBear",
      active: true,
    },
  });

  const hubOwner = await prisma.user.upsert({
    where: { id: "0199ca9b-50ed-75b6-9f9a-fb1ea74ab51c" },
    update: {
      email: "hubowner@test.com",
      emailVerified: true,
      name: "Hub Owner",
      username: "hubowner",
      displayUsername: "HubOwner",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ca9b-50ed-75b6-9f9a-fb1ea74ab51c",
      email: "hubowner@test.com",
      emailVerified: true,
      name: "Hub Owner",
      username: "hubowner",
      displayUsername: "HubOwner",
      active: true,
    },
  });

  // #endregion

  // #region Teams

  // #region team
  const team = await prisma.team.upsert({
    where: { id: "0199ad01-96ce-738c-8700-daa08f581caa" },
    update: {
      teamOwnerId: owner.id,
      name: "ascnd-team",
      displayName: "ASCND-Team",
      logo: null,
      banner: null,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad01-96ce-738c-8700-daa08f581caa",
      teamOwnerId: owner.id,
      name: "ascnd-team",
      displayName: "ASCND-Team",
      logo: null,
      banner: null,
    },
  });

  // #region Team Members
  await prisma.userTeam.upsert({
    where: { teamId_userId: { teamId: team.id, userId: member.id } },
    update: { updatedAt: new Date() },
    create: {
      teamId: team.id,
      userId: member.id,
    },
  });

  await prisma.userTeam.upsert({
    where: { teamId_userId: { teamId: team.id, userId: owner.id } },
    update: { updatedAt: new Date() },
    create: {
      teamId: team.id,
      userId: owner.id,
    },
  });
  // #endregion

  // #region Team Invites
  await prisma.teamInvite.upsert({
    where: { id: "0199bcb0-654b-7d43-a291-b8a1e92878b2" },
    update: { updatedAt: new Date() },
    create: {
      id: "0199bcb0-654b-7d43-a291-b8a1e92878b2",
      teamId: team.id,
      userId: member.id,
      status: InviteStatus.ACCEPTED,
    },
  });
  // #endregion
  // #endregion

  // #region team2
  const team2 = await prisma.team.upsert({
    where: { id: "0199ad02-14c0-772b-a021-95fdd0dc42f8" },
    update: {
      id: "0199ad02-14c0-772b-a021-95fdd0dc42f8",
      teamOwnerId: userA.id,
      name: "spacestation",
      displayName: "Spacestation",
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad02-14c0-772b-a021-95fdd0dc42f8",
      teamOwnerId: userA.id,
      name: "spacestation",
      displayName: "Spacestation",
    },
  });

  // #region Team Members
  await prisma.userTeam.upsert({
    where: { teamId_userId: { teamId: team2.id, userId: userB.id } },
    update: { updatedAt: new Date() },
    create: { teamId: team2.id, userId: userB.id },
  });

  await prisma.userTeam.upsert({
    where: { teamId_userId: { teamId: team2.id, userId: owner.id } },
    update: { updatedAt: new Date() },
    create: { teamId: team2.id, userId: owner.id },
  });

  await prisma.userTeam.upsert({
    where: { teamId_userId: { teamId: team2.id, userId: userA.id } },
    update: { updatedAt: new Date() },
    create: { teamId: team2.id, userId: userA.id },
  });
  // #endregion

  // #region Team Invites
  await prisma.teamInvite.upsert({
    where: { id: "0199bcb0-9cd9-7dbd-9f98-e70c01c9f1bb" },
    update: { status: InviteStatus.ACCEPTED, updatedAt: new Date() },
    create: {
      id: "0199bcb0-9cd9-7dbd-9f98-e70c01c9f1bb",
      teamId: team2.id,
      userId: userB.id,
      status: InviteStatus.ACCEPTED,
    },
  });

  await prisma.teamInvite.upsert({
    where: { id: "0199bcb0-cd16-7312-82b5-b4da3d8e7704" },
    update: { status: InviteStatus.ACCEPTED, updatedAt: new Date() },
    create: {
      id: "0199bcb0-cd16-7312-82b5-b4da3d8e7704",
      teamId: team2.id,
      userId: owner.id,
      status: InviteStatus.ACCEPTED,
    },
  });

  await prisma.teamInvite.upsert({
    where: { id: "0199bcb0-cd16-7312-82b5-b4da3d8e7704" },
    update: { status: InviteStatus.DECLINED, updatedAt: new Date() },
    create: {
      id: "0199bcb0-cd16-7312-82b5-b4da3d8e7704",
      teamId: team2.id,
      userId: userC.id,
      status: InviteStatus.DECLINED,
    },
  });

  await prisma.teamInvite.upsert({
    where: { id: "0199bcb0-fa7b-7701-95bb-c4f2c2a79977" },
    update: { status: InviteStatus.PENDING, updatedAt: new Date() },
    create: {
      id: "0199bcb0-fa7b-7701-95bb-c4f2c2a79977",
      teamId: team2.id,
      userId: userA.id,
      status: InviteStatus.PENDING,
    },
  });
  // #endregion
  // #endregion

  // #region team3
  const team3 = await prisma.team.upsert({
    where: { id: "0199ad02-f5e4-7bf9-97c2-851dc9e792c4" },
    update: {
      id: "0199ad02-f5e4-7bf9-97c2-851dc9e792c4",
      teamOwnerId: userB.id,
      name: "prosquad",
      displayName: "ProSquad",
      updatedAt: new Date(),
    },
    create: {
      id: "0199ad02-f5e4-7bf9-97c2-851dc9e792c4",
      teamOwnerId: userB.id,
      name: "prosquad",
      displayName: "ProSquad",
    },
  });

  // #region Team Members
  await prisma.userTeam.upsert({
    where: { teamId_userId: { teamId: team3.id, userId: userA.id } },
    update: { updatedAt: new Date() },
    create: { teamId: team3.id, userId: userA.id },
  });

  await prisma.userTeam.upsert({
    where: { teamId_userId: { teamId: team3.id, userId: userB.id } },
    update: { updatedAt: new Date() },
    create: { teamId: team3.id, userId: userB.id },
  });
  // #endregion

  // #region Team Invites
  await prisma.teamInvite.upsert({
    where: { id: "0199bcb1-1916-789d-a53f-6947c9163a83" },
    update: { status: InviteStatus.ACCEPTED, updatedAt: new Date() },
    create: {
      id: "0199bcb1-1916-789d-a53f-6947c9163a83",
      teamId: team3.id,
      userId: userA.id,
      status: InviteStatus.ACCEPTED,
    },
  });

  await prisma.teamInvite.upsert({
    where: { id: "0199bcb1-3854-777a-bd27-7986a1ba85c0" },
    update: { status: InviteStatus.CANCELLED, updatedAt: new Date() },
    create: {
      id: "0199bcb1-3854-777a-bd27-7986a1ba85c0",
      teamId: team3.id,
      userId: member.id,
      status: InviteStatus.CANCELLED,
    },
  });
  // #endregion
  // #endregion
  // #endregion

  // #region Hubs

  // #region hub
  const hub = await prisma.hub.upsert({
    where: { id: "0199ca9a-b215-7506-b999-6a16877011c5" },
    update: {
      hubOwnerId: hubOwner.id,
      name: "ascnd hub",
      displayName: "Asncd Hub",
      logo: null,
      banner: null,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ca9a-b215-7506-b999-6a16877011c5",
      hubOwnerId: hubOwner.id,
      name: "ascnd hub",
      displayName: "Asncd Hub",
      logo: null,
      banner: null,
    },
  });

  // #region Hub Members
  await prisma.userHub.upsert({
    where: { hubId_userId: { hubId: hub.id, userId: hubOwner.id } },
    update: { updatedAt: new Date() },
    create: {
      hubId: hub.id,
      userId: hubOwner.id,
    },
  });
  // #endregion

  // #region Hub Invites
  await prisma.hubInvite.upsert({
    where: { id: "0199ca9d-c5de-7a3e-8754-2bba1045ad6c" },
    update: { updatedAt: new Date() },
    create: {
      id: "0199ca9d-c5de-7a3e-8754-2bba1045ad6c",
      hubId: hub.id,
      userId: userD.id,
      status: InviteStatus.PENDING,
    },
  });
  // #endregion
  // #endregion

  // #region hub2
  const hub2 = await prisma.hub.upsert({
    where: { id: "0199ca9e-b215-7506-b999-6a16877011c5" },
    update: {
      hubOwnerId: userD.id,
      name: "east collegiate league",
      displayName: "East Collegiate League",
      logo: null,
      banner: null,
      updatedAt: new Date(),
    },
    create: {
      id: "0199ca9e-b215-7506-b999-6a16877011c5",
      hubOwnerId: userD.id,
      name: "east collegiate league",
      displayName: "East Collegiate League",
      logo: null,
      banner: null,
    },
  });

  // #region Hub Members
  await prisma.userHub.upsert({
    where: { hubId_userId: { hubId: hub2.id, userId: userD.id } },
    update: { updatedAt: new Date() },
    create: {
      hubId: hub2.id,
      userId: userD.id,
    },
  });

  await prisma.userHub.upsert({
    where: { hubId_userId: { hubId: hub2.id, userId: userE.id } },
    update: { updatedAt: new Date() },
    create: {
      hubId: hub2.id,
      userId: userE.id,
    },
  });
  // #endregion

  // #region Hub Invites
  await prisma.hubInvite.upsert({
    where: { id: "0199ca9f-c5de-7a3e-8754-2bba1045ad6c" },
    update: { updatedAt: new Date() },
    create: {
      id: "0199ca9f-c5de-7a3e-8754-2bba1045ad6c",
      hubId: hub2.id,
      userId: userE.id,
      status: InviteStatus.ACCEPTED,
    },
  });

  await prisma.hubInvite.upsert({
    where: { id: "0199caa0-c5de-7a3e-8754-2bba1045ad6c" },
    update: { updatedAt: new Date() },
    create: {
      id: "0199caa0-c5de-7a3e-8754-2bba1045ad6c",
      hubId: hub2.id,
      userId: userF.id,
      status: InviteStatus.PENDING,
    },
  });

  await prisma.hubInvite.upsert({
    where: { id: "0199caa1-c5de-7a3e-8754-2bba1045ad6c" },
    update: { updatedAt: new Date() },
    create: {
      id: "0199caa1-c5de-7a3e-8754-2bba1045ad6c",
      hubId: hub2.id,
      userId: userG.id,
      status: InviteStatus.DECLINED,
    },
  });
  // #endregion
  // #endregion

  // #region hub3
  const hub3 = await prisma.hub.upsert({
    where: { id: "0199caa2-b215-7506-b999-6a16877011c5" },
    update: {
      hubOwnerId: userH.id,
      name: "ontario hs esports",
      displayName: "Ontario HS Esports",
      logo: null,
      banner: null,
      updatedAt: new Date(),
    },
    create: {
      id: "0199caa2-b215-7506-b999-6a16877011c5",
      hubOwnerId: userH.id,
      name: "ontario hs esports",
      displayName: "Ontario HS Esports",
      logo: null,
      banner: null,
    },
  });

  // #region Hub Members
  await prisma.userHub.upsert({
    where: { hubId_userId: { hubId: hub3.id, userId: userH.id } },
    update: { updatedAt: new Date() },
    create: {
      hubId: hub3.id,
      userId: userH.id,
    },
  });

  await prisma.userHub.upsert({
    where: { hubId_userId: { hubId: hub3.id, userId: userI.id } },
    update: { updatedAt: new Date() },
    create: {
      hubId: hub3.id,
      userId: userI.id,
    },
  });
  // #endregion

  // #region Hub Invites
  await prisma.hubInvite.upsert({
    where: { id: "0199caa3-c5de-7a3e-8754-2bba1045ad6c" },
    update: { updatedAt: new Date() },
    create: {
      id: "0199caa3-c5de-7a3e-8754-2bba1045ad6c",
      hubId: hub3.id,
      userId: userI.id,
      status: InviteStatus.ACCEPTED,
    },
  });

  await prisma.hubInvite.upsert({
    where: { id: "0199caa4-c5de-7a3e-8754-2bba1045ad6c" },
    update: { updatedAt: new Date() },
    create: {
      id: "0199caa4-c5de-7a3e-8754-2bba1045ad6c",
      hubId: hub3.id,
      userId: userJ.id,
      status: InviteStatus.PENDING,
    },
  });

  await prisma.hubInvite.upsert({
    where: { id: "0199caa5-c5de-7a3e-8754-2bba1045ad6c" },
    update: { updatedAt: new Date() },
    create: {
      id: "0199caa5-c5de-7a3e-8754-2bba1045ad6c",
      hubId: hub3.id,
      userId: userK.id,
      status: InviteStatus.CANCELLED,
    },
  });
  // #endregion
  // #endregion

  // #endregion
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
