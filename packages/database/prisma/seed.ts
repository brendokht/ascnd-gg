/* eslint-disable @typescript-eslint/no-unused-vars */

import { prisma, InviteStatus } from "../src/index";

async function main() {
  // #region Users
  const owner = await prisma.user.upsert({
    where: { email: "owner@test.com" },
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
      email: "owner@test.com",
      emailVerified: true,
      name: "Team Owner",
      username: "teamowner",
      displayUsername: "TeamOwner",
      active: true,
    },
  });

  const member = await prisma.user.upsert({
    where: { email: "member@test.com" },
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
      email: "member@test.com",
      emailVerified: true,
      name: "Member User",
      username: "memberuser",
      displayUsername: "memberuser",
      active: true,
    },
  });

  const userA = await prisma.user.upsert({
    where: { email: "alice@test.com" },
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
      email: "alice@test.com",
      emailVerified: true,
      name: "Alice Moreno",
      username: "a1iceblitz",
      displayUsername: "A1iceBlitz",
      active: true,
    },
  });

  const userB = await prisma.user.upsert({
    where: { email: "bob@test.com" },
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
      email: "bob@test.com",
      emailVerified: true,
      name: "Robert Barnes",
      username: "riftranger",
      displayUsername: "RiftRanger",
      active: true,
    },
  });

  const userC = await prisma.user.upsert({
    where: { email: "charlie@test.com" },
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
      email: "charlie@test.com",
      emailVerified: true,
      name: "Charles Miller",
      username: "cha0scharlie",
      displayUsername: "Cha0sCharlie",
      active: false,
    },
  });

  const userD = await prisma.user.upsert({
    where: { email: "devon@test.com" },
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
      email: "devon@test.com",
      emailVerified: true,
      name: "Devon Tanner",
      username: "dev0nx",
      displayUsername: "Dev0nX",
      active: true,
    },
  });

  const userE = await prisma.user.upsert({
    where: { email: "easton@test.com" },
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
      email: "easton@test.com",
      emailVerified: true,
      name: "Easton Hale",
      username: "eastsidex",
      displayUsername: "EastSideX",
      active: true,
    },
  });

  const userF = await prisma.user.upsert({
    where: { email: "patrick@test.com" },
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
      email: "patrick@test.com",
      emailVerified: true,
      name: "Patrick Fenton",
      username: "fentstrike",
      displayUsername: "FentStrike",
      active: true,
    },
  });

  const userG = await prisma.user.upsert({
    where: { email: "gina@test.com" },
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
      email: "gina@test.com",
      emailVerified: true,
      name: "Gina Morales",
      username: "g1na",
      displayUsername: "G1na",
      active: true,
    },
  });

  const userH = await prisma.user.upsert({
    where: { email: "harry@test.com" },
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
      email: "harry@test.com",
      emailVerified: true,
      name: "Harry Cole",
      username: "h4rryc0le",
      displayUsername: "H4RRyC0le",
      active: true,
    },
  });

  const userI = await prisma.user.upsert({
    where: { email: "ingrid@test.com" },
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
      email: "ingrid@test.com",
      emailVerified: true,
      name: "Ingrid Svensson",
      username: "ingridvex",
      displayUsername: "IngridVex",
      active: true,
    },
  });

  const userJ = await prisma.user.upsert({
    where: { email: "jason@test.com" },
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
      email: "jason@test.com",
      emailVerified: true,
      name: "Jason Brookes",
      username: "jaxbrookes",
      displayUsername: "JaxBrookes",
      active: true,
    },
  });

  const userK = await prisma.user.upsert({
    where: { email: "karen@test.com" },
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
      email: "karen@test.com",
      emailVerified: true,
      name: "Karen Lee",
      username: "karenade",
      displayUsername: "KareNade",
      active: true,
    },
  });

  const userL = await prisma.user.upsert({
    where: { email: "luke@test.com" },
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
      email: "luke@test.com",
      emailVerified: true,
      name: "Luke Harper",
      username: "lukesh0t",
      displayUsername: "LukeSh0t",
      active: true,
    },
  });

  const userM = await prisma.user.upsert({
    where: { email: "mia@test.com" },
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
      email: "mia@test.com",
      emailVerified: true,
      name: "Mia Torres",
      username: "miapulse",
      displayUsername: "MiaPulse",
      active: true,
    },
  });

  const userN = await prisma.user.upsert({
    where: { email: "nate@test.com" },
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
      email: "nate@test.com",
      emailVerified: true,
      name: "Nate Rivers",
      username: "n8rage",
      displayUsername: "N8Rage",
      active: true,
    },
  });

  const userO = await prisma.user.upsert({
    where: { email: "olivia@test.com" },
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
      email: "olivia@test.com",
      emailVerified: true,
      name: "Olivia Park",
      username: "olivion",
      displayUsername: "Olivion",
      active: true,
    },
  });

  const userP = await prisma.user.upsert({
    where: { email: "paul@test.com" },
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
      email: "paul@test.com",
      emailVerified: true,
      name: "Paul Anderson",
      username: "paul0xe",
      displayUsername: "Paul0xe",
      active: true,
    },
  });

  const userQ = await prisma.user.upsert({
    where: { email: "quinn@test.com" },
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
      email: "quinn@test.com",
      emailVerified: true,
      name: "Quinn Storey",
      username: "quincey",
      displayUsername: "quincey",
      active: true,
    },
  });

  const userR = await prisma.user.upsert({
    where: { email: "riley@test.com" },
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
      email: "riley@test.com",
      emailVerified: true,
      name: "Riley Kohut",
      username: "rileydadog",
      displayUsername: "RileyDaDog",
      active: true,
    },
  });
  const userS = await prisma.user.upsert({
    where: { email: "sam@test.com" },
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
      email: "sam@test.com",
      emailVerified: true,
      name: "Sam McPhearson",
      username: "sammickey",
      displayUsername: "SamMickey",
      active: true,
    },
  });

  const userT = await prisma.user.upsert({
    where: { email: "terrance@test.com" },
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
      email: "terrance@test.com",
      emailVerified: true,
      name: "Terrance Johnson",
      username: "terrebear",
      displayUsername: "TerreBear",
      active: true,
    },
  });

  const hubOwner = await prisma.user.upsert({
    where: { email: "hubowner@test.com" },
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
      email: "hubowner@test.com",
      emailVerified: true,
      name: "Hub Owner",
      username: "hubowner",
      displayUsername: "HubOwner",
      active: true,
    },
  });

  const userU = await prisma.user.upsert({
    where: { email: "useru@test.com" },
    update: {
      email: "useru@test.com",
      emailVerified: true,
      name: "User U",
      username: "useru",
      displayUsername: "UserU",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      email: "useru@test.com",
      emailVerified: true,
      name: "User U",
      username: "useru",
      displayUsername: "UserU",
      active: true,
    },
  });

  const userV = await prisma.user.upsert({
    where: { email: "userv@test.com" },
    update: {
      email: "userv@test.com",
      emailVerified: true,
      name: "User V",
      username: "userv",
      displayUsername: "UserV",
      active: true,
      updatedAt: new Date(),
    },
    create: {
      email: "userv@test.com",
      emailVerified: true,
      name: "User V",
      username: "userv",
      displayUsername: "UserV",
      active: true,
    },
  });

  // #endregion

  // #region Teams

  // #region team
  const team = await prisma.team.upsert({
    where: { name: "ascnd-team" },
    update: {
      teamOwnerId: owner.id,
      name: "ascnd-team",
      displayName: "ASCND-Team",
      logo: null,
      banner: null,
      updatedAt: new Date(),
    },
    create: {
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

  // #endregion

  // #region team2
  const team2 = await prisma.team.upsert({
    where: { name: "spacestation" },
    update: {
      teamOwnerId: userA.id,
      name: "spacestation",
      displayName: "Spacestation",
      updatedAt: new Date(),
    },
    create: {
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

  // #endregion

  // #region team3
  const team3 = await prisma.team.upsert({
    where: { name: "prosquad" },
    update: {
      teamOwnerId: userB.id,
      name: "prosquad",
      displayName: "ProSquad",
      updatedAt: new Date(),
    },
    create: {
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

  // #endregion

  // #region team4
  const team4 = await prisma.team.upsert({
    where: { name: "team4" },
    update: {
      teamOwnerId: userU.id,
      name: "team4",
      displayName: "Team 4",
      updatedAt: new Date(),
    },
    create: {
      teamOwnerId: userU.id,
      name: "team4",
      displayName: "Team 4",
    },
  });

  // #region Team Members
  await prisma.userTeam.upsert({
    where: { teamId_userId: { teamId: team4.id, userId: userU.id } },
    update: { updatedAt: new Date() },
    create: { teamId: team4.id, userId: userU.id },
  });

  await prisma.userTeam.upsert({
    where: { teamId_userId: { teamId: team4.id, userId: userV.id } },
    update: { updatedAt: new Date() },
    create: { teamId: team4.id, userId: userV.id },
  });
  // #endregion

  // #endregion

  // #endregion

  // #region Hubs

  // #region hub
  const hub = await prisma.hub.upsert({
    where: { name: "ascnd hub" },
    update: {
      hubOwnerId: hubOwner.id,
      name: "ascnd hub",
      displayName: "Asncd Hub",
      logo: null,
      banner: null,
      updatedAt: new Date(),
    },
    create: {
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

  // #endregion

  // #region hub2
  const hub2 = await prisma.hub.upsert({
    where: { name: "east collegiate league" },
    update: {
      hubOwnerId: userD.id,
      name: "east collegiate league",
      displayName: "East Collegiate League",
      logo: null,
      banner: null,
      updatedAt: new Date(),
    },
    create: {
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

  // #endregion

  // #region hub3
  const hub3 = await prisma.hub.upsert({
    where: { name: "ontario hs esports" },
    update: {
      hubOwnerId: userH.id,
      name: "ontario hs esports",
      displayName: "Ontario HS Esports",
      logo: null,
      banner: null,
      updatedAt: new Date(),
    },
    create: {
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

  // #endregion

  // #region hub4
  const hub4 = await prisma.hub.upsert({
    where: { name: "hub4" },
    update: {
      hubOwnerId: userU.id,
      name: "hub4",
      displayName: "Hub 4",
      updatedAt: new Date(),
    },
    create: {
      hubOwnerId: userU.id,
      name: "hub4",
      displayName: "Hub 4",
    },
  });

  // #region Hub Members
  await prisma.userHub.upsert({
    where: { hubId_userId: { hubId: hub4.id, userId: userU.id } },
    update: { updatedAt: new Date() },
    create: {
      hubId: hub4.id,
      userId: userU.id,
    },
  });

  await prisma.userHub.upsert({
    where: { hubId_userId: { hubId: hub4.id, userId: userV.id } },
    update: { updatedAt: new Date() },
    create: {
      hubId: hub4.id,
      userId: userV.id,
    },
  });
  // #endregion

  // #endregion

  // #endregion

  // #region Invites

  // #region Team Invites

  await prisma.teamInvite.createMany({
    data: [
      { teamId: team.id, userId: member.id, status: InviteStatus.ACCEPTED },
      { teamId: team2.id, userId: userB.id, status: InviteStatus.ACCEPTED },
      { teamId: team2.id, userId: owner.id, status: InviteStatus.ACCEPTED },
      { teamId: team2.id, userId: userC.id, status: InviteStatus.DECLINED },
      { teamId: team2.id, userId: userA.id, status: InviteStatus.PENDING },
      { teamId: team3.id, userId: userA.id, status: InviteStatus.ACCEPTED },
      { teamId: team3.id, userId: member.id, status: InviteStatus.CANCELLED },
      { teamId: team4.id, userId: userV.id, status: InviteStatus.ACCEPTED },
    ],
    skipDuplicates: true,
  });

  // #endregion

  // #region Hub Invites

  await prisma.hubInvite.createMany({
    data: [
      { hubId: hub.id, userId: userD.id, status: InviteStatus.PENDING },
      { hubId: hub2.id, userId: userE.id, status: InviteStatus.ACCEPTED },
      { hubId: hub2.id, userId: userF.id, status: InviteStatus.PENDING },
      { hubId: hub2.id, userId: userG.id, status: InviteStatus.DECLINED },
      { hubId: hub3.id, userId: userI.id, status: InviteStatus.ACCEPTED },
      { hubId: hub3.id, userId: userJ.id, status: InviteStatus.PENDING },
      { hubId: hub3.id, userId: userK.id, status: InviteStatus.CANCELLED },
      { hubId: hub4.id, userId: userV.id, status: InviteStatus.ACCEPTED },
    ],
    skipDuplicates: true,
  });

  // #endregion

  // #endregion

  // #region Titles

  // #region Genres
  const fpsGenre = await prisma.titleGenre.upsert({
    where: { name: "fps" },
    update: {},
    create: {
      name: "fps",
      displayName: "First Person Shooter",
    },
  });

  const sportsGenre = await prisma.titleGenre.upsert({
    where: { name: "sports" },
    update: {},
    create: {
      name: "sports",
      displayName: "Sports",
    },
  });

  const mobaGenre = await prisma.titleGenre.upsert({
    where: { name: "moba" },
    update: {},
    create: {
      name: "moba",
      displayName: "Multiplayer Online Battle Arena",
    },
  });
  // #endregion

  // #region Rainbow Six Siege
  const rainbowSixSiege = await prisma.title.upsert({
    where: { name: "rainbow six siege" },
    update: { updatedAt: new Date() },
    create: {
      name: "rainbow six siege",
      displayName: "Rainbow Six Siege",
      genreId: fpsGenre.id,
    },
  });

  // #region Maps
  const rainbowSixSiegeMaps = await prisma.titleMap.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "club house",
        displayName: "Club House",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "bank",
        displayName: "Bank",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "kafe dostoyevsky",
        displayName: "Kafe Dostoyevsky",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "chalet",
        displayName: "Chalet",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "border",
        displayName: "Border",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "stadium alpha",
        displayName: "Stadium Alpha",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "stadium bravo",
        displayName: "Stadium Bravo",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "lair",
        displayName: "Lair",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "nighthaven labs",
        displayName: "Nighthaven Labs",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "close quarter",
        displayName: "Close Quarter",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "emerald plains",
        displayName: "Emerald Plains",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "coastline",
        displayName: "Coastline",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "consulate",
        displayName: "Consulate",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "favela",
        displayName: "Favela",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "fortress",
        displayName: "Fortress",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "hereford base",
        displayName: "Hereford Base",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "house",
        displayName: "House",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "kanal",
        displayName: "Kanal",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "oregon",
        displayName: "Oregon",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "outback",
        displayName: "Outback",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "presidential plane",
        displayName: "Presidential Plane",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "skyscraper",
        displayName: "Skyscraper",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "theme park",
        displayName: "Theme Park",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "tower",
        displayName: "Tower",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "villa",
        displayName: "Villa",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "Yacht",
        displayName: "Yacht",
        titleId: rainbowSixSiege.id,
      },
    ],
  });
  // #endregion

  // #region Characters

  const [
    r6Denari,
    r6Rauora,
    r6Skopos,
    r6Striker,
    r6Sentry,
    r6Deimos,
    r6Tubarao,
    r6Ram,
    r6Fenrir,
    r6Brava,
    r6Solis,
    r6Grim,
    r6Sens,
    r6Azami,
    r6Thorn,
    r6Osa,
    r6Thunderbird,
    r6Flores,
    r6Aruni,
    r6Zero,
    r6Ace,
    r6Melusi,
    r6Oryx,
    r6Iana,
    r6Wamai,
    r6Kali,
    r6Amaru,
    r6Goyo,
    r6Nokk,
    r6Warden,
    r6Mozzie,
    r6Gridlock,
    r6Nomad,
    r6Kaid,
    r6Clash,
    r6Maverick,
    r6Maestro,
    r6Alibi,
    r6Lion,
    r6Finka,
    r6Vigil,
    r6Dokkaebi,
    r6Zofia,
    r6Ela,
    r6Ying,
    r6Lesion,
    r6Mira,
    r6Jackal,
    r6Hibana,
    r6Echo,
    r6Caveira,
    r6Capitao,
    r6Blackbeard,
    r6Valkyrie,
    r6Buck,
    r6Frost,
    r6Mute,
    r6Sledge,
    r6Smoke,
    r6Thatcher,
    r6Ash,
    r6Castle,
    r6Pulse,
    r6Thermite,
    r6Montagne,
    r6Twitch,
    r6Doc,
    r6Rook,
    r6Jager,
    r6Bandit,
    r6Blitz,
    r6Iq,
    r6Fuze,
    r6Glaz,
    r6Tachanka,
    r6Kapkan,
  ] = await prisma.titleCharacter.createManyAndReturn({
    skipDuplicates: true,
    data: [
      { name: "denari", displayName: "Denari", titleId: rainbowSixSiege.id },
      { name: "rauora", displayName: "Rauora", titleId: rainbowSixSiege.id },
      { name: "skopos", displayName: "Skopós", titleId: rainbowSixSiege.id },
      { name: "striker", displayName: "Striker", titleId: rainbowSixSiege.id },
      { name: "sentry", displayName: "Sentry", titleId: rainbowSixSiege.id },
      { name: "deimos", displayName: "Deimos", titleId: rainbowSixSiege.id },
      { name: "tubarao", displayName: "Tubarão", titleId: rainbowSixSiege.id },
      { name: "ram", displayName: "Ram", titleId: rainbowSixSiege.id },
      { name: "fenrir", displayName: "Fenrir", titleId: rainbowSixSiege.id },
      { name: "brava", displayName: "Brava", titleId: rainbowSixSiege.id },
      { name: "solis", displayName: "Solis", titleId: rainbowSixSiege.id },
      { name: "grim", displayName: "Grim", titleId: rainbowSixSiege.id },
      { name: "sens", displayName: "Sens", titleId: rainbowSixSiege.id },
      { name: "azami", displayName: "Azami", titleId: rainbowSixSiege.id },
      { name: "thorn", displayName: "Thorn", titleId: rainbowSixSiege.id },
      { name: "osa", displayName: "Osa", titleId: rainbowSixSiege.id },
      {
        name: "thunderbird",
        displayName: "Thunderbird",
        titleId: rainbowSixSiege.id,
      },
      { name: "flores", displayName: "Flores", titleId: rainbowSixSiege.id },
      { name: "aruni", displayName: "Aruni", titleId: rainbowSixSiege.id },
      { name: "zero", displayName: "Zero", titleId: rainbowSixSiege.id },
      { name: "ace", displayName: "Ace", titleId: rainbowSixSiege.id },
      { name: "melusi", displayName: "Melusi", titleId: rainbowSixSiege.id },
      { name: "oryx", displayName: "Oryx", titleId: rainbowSixSiege.id },
      { name: "iana", displayName: "Iana", titleId: rainbowSixSiege.id },
      { name: "wamai", displayName: "Wamai", titleId: rainbowSixSiege.id },
      { name: "kali", displayName: "Kali", titleId: rainbowSixSiege.id },
      { name: "amaru", displayName: "Amaru", titleId: rainbowSixSiege.id },
      { name: "goyo", displayName: "Goyo", titleId: rainbowSixSiege.id },
      { name: "nokk", displayName: "NØKK", titleId: rainbowSixSiege.id },
      { name: "warden", displayName: "Warden", titleId: rainbowSixSiege.id },
      { name: "mozzie", displayName: "Mozzie", titleId: rainbowSixSiege.id },
      {
        name: "gridlock",
        displayName: "Gridlock",
        titleId: rainbowSixSiege.id,
      },
      { name: "nomad", displayName: "Nomad", titleId: rainbowSixSiege.id },
      { name: "kaid", displayName: "Kaid", titleId: rainbowSixSiege.id },
      { name: "clash", displayName: "Clash", titleId: rainbowSixSiege.id },
      {
        name: "maverick",
        displayName: "Maverick",
        titleId: rainbowSixSiege.id,
      },
      { name: "maestro", displayName: "Maestro", titleId: rainbowSixSiege.id },
      { name: "alibi", displayName: "Alibi", titleId: rainbowSixSiege.id },
      { name: "lion", displayName: "Lion", titleId: rainbowSixSiege.id },
      { name: "finka", displayName: "Finka", titleId: rainbowSixSiege.id },
      { name: "vigil", displayName: "Vigil", titleId: rainbowSixSiege.id },
      {
        name: "dokkaebi",
        displayName: "Dokkaebi",
        titleId: rainbowSixSiege.id,
      },
      { name: "zofia", displayName: "Zofia", titleId: rainbowSixSiege.id },
      { name: "ela", displayName: "Ela", titleId: rainbowSixSiege.id },
      { name: "ying", displayName: "Ying", titleId: rainbowSixSiege.id },
      { name: "lesion", displayName: "Lesion", titleId: rainbowSixSiege.id },
      { name: "mira", displayName: "Mira", titleId: rainbowSixSiege.id },
      { name: "jackal", displayName: "Jackal", titleId: rainbowSixSiege.id },
      { name: "hibana", displayName: "Hibana", titleId: rainbowSixSiege.id },
      { name: "echo", displayName: "Echo", titleId: rainbowSixSiege.id },
      { name: "caveira", displayName: "Caveira", titleId: rainbowSixSiege.id },
      { name: "capitao", displayName: "CAPITÃO", titleId: rainbowSixSiege.id },
      {
        name: "blackbeard",
        displayName: "Blackbeard",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "valkyrie",
        displayName: "Valkyrie",
        titleId: rainbowSixSiege.id,
      },
      { name: "buck", displayName: "Buck", titleId: rainbowSixSiege.id },
      { name: "frost", displayName: "Frost", titleId: rainbowSixSiege.id },
      { name: "mute", displayName: "Mute", titleId: rainbowSixSiege.id },
      { name: "sledge", displayName: "Sledge", titleId: rainbowSixSiege.id },
      { name: "smoke", displayName: "Smoke", titleId: rainbowSixSiege.id },
      {
        name: "thatcher",
        displayName: "Thatcher",
        titleId: rainbowSixSiege.id,
      },
      { name: "ash", displayName: "Ash", titleId: rainbowSixSiege.id },
      { name: "castle", displayName: "Castle", titleId: rainbowSixSiege.id },
      { name: "pulse", displayName: "Pulse", titleId: rainbowSixSiege.id },
      {
        name: "thermite",
        displayName: "Thermite",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "montagne",
        displayName: "Montagne",
        titleId: rainbowSixSiege.id,
      },
      { name: "twitch", displayName: "Twitch", titleId: rainbowSixSiege.id },
      { name: "doc", displayName: "Doc", titleId: rainbowSixSiege.id },
      { name: "rook", displayName: "Rook", titleId: rainbowSixSiege.id },
      { name: "jager", displayName: "Jäger", titleId: rainbowSixSiege.id },
      { name: "bandit", displayName: "Bandit", titleId: rainbowSixSiege.id },
      { name: "blitz", displayName: "Blitz", titleId: rainbowSixSiege.id },
      { name: "iq", displayName: "IQ", titleId: rainbowSixSiege.id },
      { name: "fuze", displayName: "Fuze", titleId: rainbowSixSiege.id },
      { name: "glaz", displayName: "Glaz", titleId: rainbowSixSiege.id },
      {
        name: "tachanka",
        displayName: "Tachanka",
        titleId: rainbowSixSiege.id,
      },
      { name: "kapkan", displayName: "Kapkan", titleId: rainbowSixSiege.id },
    ],
  });
  // #endregion

  // #region Gamemodes
  const rainbowSixSiegeGamemodes = await prisma.titleGamemode.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: rainbowSixSiege.id,
        name: "bomb",
        displayName: "Bomb",
      },
      {
        titleId: rainbowSixSiege.id,
        name: "secure area",
        displayName: "Secure Area",
      },
      {
        titleId: rainbowSixSiege.id,
        name: "hostage",
        displayName: "Hostage",
      },
      {
        titleId: rainbowSixSiege.id,
        name: "team deathmatch",
        displayName: "Team Deathmatch",
      },
      {
        titleId: rainbowSixSiege.id,
        name: "free for all",
        displayName: "Free For All",
      },
    ],
  });
  // #endregion

  // #region Roles

  const [
    r6AntiEntry,
    r6CrowdControl,
    r6Support,
    r6MapControl,
    r6Intel,
    r6AntiGadget,
    r6Breach,
    r6Trapper,
    r6FrontLine,
  ] = await prisma.titleRole.createManyAndReturn({
    skipDuplicates: true,
    data: [
      {
        name: "anti-entry",
        displayName: "Anti-Entry",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "crowd control",
        displayName: "Crowd Control",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "support",
        displayName: "Support",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "map control",
        displayName: "Map Control",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "intel",
        displayName: "Intel",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "anti-gadget",
        displayName: "Anti-Gadget",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "breach",
        displayName: "Breach",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "trapper",
        displayName: "Trapper",
        titleId: rainbowSixSiege.id,
      },
      {
        name: "front line",
        displayName: "Front Line",
        titleId: rainbowSixSiege.id,
      },
    ],
  });

  // #endregion

  // #region Character Roles

  await prisma.titleCharacterRole.createMany({
    skipDuplicates: true,
    data: [
      { characterId: r6Denari!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Tubarao!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Azami!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Thorn!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Aruni!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Goyo!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Lesion!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Frost!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Smoke!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Castle!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Bandit!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Tachanka!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Kapkan!.id, roleId: r6AntiEntry!.id },
      { characterId: r6Denari!.id, roleId: r6CrowdControl!.id },
      { characterId: r6Fenrir!.id, roleId: r6CrowdControl!.id },
      { characterId: r6Melusi!.id, roleId: r6CrowdControl!.id },
      { characterId: r6Clash!.id, roleId: r6CrowdControl!.id },
      { characterId: r6Vigil!.id, roleId: r6CrowdControl!.id },
      { characterId: r6Ela!.id, roleId: r6CrowdControl!.id },
      { characterId: r6Echo!.id, roleId: r6CrowdControl!.id },
      { characterId: r6Mute!.id, roleId: r6CrowdControl!.id },
      { characterId: r6Tachanka!.id, roleId: r6CrowdControl!.id },
      { characterId: r6Rauora!.id, roleId: r6Support!.id },
      { characterId: r6Skopos!.id, roleId: r6Support!.id },
      { characterId: r6Striker!.id, roleId: r6Support!.id },
      { characterId: r6Sentry!.id, roleId: r6Support!.id },
      { characterId: r6Solis!.id, roleId: r6Support!.id },
      { characterId: r6Sens!.id, roleId: r6Support!.id },
      { characterId: r6Azami!.id, roleId: r6Support!.id },
      { characterId: r6Osa!.id, roleId: r6Support!.id },
      { characterId: r6Thunderbird!.id, roleId: r6Support!.id },
      { characterId: r6Oryx!.id, roleId: r6Support!.id },
      { characterId: r6Kali!.id, roleId: r6Support!.id },
      { characterId: r6Gridlock!.id, roleId: r6Support!.id },
      { characterId: r6Finka!.id, roleId: r6Support!.id },
      { characterId: r6Mira!.id, roleId: r6Support!.id },
      { characterId: r6Valkyrie!.id, roleId: r6Support!.id },
      { characterId: r6Buck!.id, roleId: r6Support!.id },
      { characterId: r6Thatcher!.id, roleId: r6Support!.id },
      { characterId: r6Castle!.id, roleId: r6Support!.id },
      { characterId: r6Pulse!.id, roleId: r6Support!.id },
      { characterId: r6Thermite!.id, roleId: r6Support!.id },
      { characterId: r6Montagne!.id, roleId: r6Support!.id },
      { characterId: r6Doc!.id, roleId: r6Support!.id },
      { characterId: r6Rook!.id, roleId: r6Support!.id },
      { characterId: r6Jager!.id, roleId: r6Support!.id },
      { characterId: r6Iq!.id, roleId: r6Support!.id },
      { characterId: r6Glaz!.id, roleId: r6Support!.id },
      { characterId: r6Rauora!.id, roleId: r6MapControl!.id },
      { characterId: r6Deimos!.id, roleId: r6MapControl!.id },
      { characterId: r6Grim!.id, roleId: r6MapControl!.id },
      { characterId: r6Sens!.id, roleId: r6MapControl!.id },
      { characterId: r6Amaru!.id, roleId: r6MapControl!.id },
      { characterId: r6Nokk!.id, roleId: r6MapControl!.id },
      { characterId: r6Gridlock!.id, roleId: r6MapControl!.id },
      { characterId: r6Nomad!.id, roleId: r6MapControl!.id },
      { characterId: r6Lion!.id, roleId: r6MapControl!.id },
      { characterId: r6Dokkaebi!.id, roleId: r6MapControl!.id },
      { characterId: r6Ying!.id, roleId: r6MapControl!.id },
      { characterId: r6Jackal!.id, roleId: r6MapControl!.id },
      { characterId: r6Capitao!.id, roleId: r6MapControl!.id },
      { characterId: r6Blitz!.id, roleId: r6MapControl!.id },
      { characterId: r6Skopos!.id, roleId: r6Intel!.id },
      { characterId: r6Deimos!.id, roleId: r6Intel!.id },
      { characterId: r6Brava!.id, roleId: r6Intel!.id },
      { characterId: r6Solis!.id, roleId: r6Intel!.id },
      { characterId: r6Osa!.id, roleId: r6Intel!.id },
      { characterId: r6Flores!.id, roleId: r6Intel!.id },
      { characterId: r6Zero!.id, roleId: r6Intel!.id },
      { characterId: r6Melusi!.id, roleId: r6Intel!.id },
      { characterId: r6Iana!.id, roleId: r6Intel!.id },
      { characterId: r6Warden!.id, roleId: r6Intel!.id },
      { characterId: r6Mozzie!.id, roleId: r6Intel!.id },
      { characterId: r6Clash!.id, roleId: r6Intel!.id },
      { characterId: r6Maestro!.id, roleId: r6Intel!.id },
      { characterId: r6Alibi!.id, roleId: r6Intel!.id },
      { characterId: r6Lion!.id, roleId: r6Intel!.id },
      { characterId: r6Dokkaebi!.id, roleId: r6Intel!.id },
      { characterId: r6Mira!.id, roleId: r6Intel!.id },
      { characterId: r6Jackal!.id, roleId: r6Intel!.id },
      { characterId: r6Echo!.id, roleId: r6Intel!.id },
      { characterId: r6Caveira!.id, roleId: r6Intel!.id },
      { characterId: r6Valkyrie!.id, roleId: r6Intel!.id },
      { characterId: r6Pulse!.id, roleId: r6Intel!.id },
      { characterId: r6Montagne!.id, roleId: r6Intel!.id },
      { characterId: r6Twitch!.id, roleId: r6Intel!.id },
      { characterId: r6Iq!.id, roleId: r6Intel!.id },
      { characterId: r6Glaz!.id, roleId: r6Intel!.id },
      { characterId: r6Tubarao!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Ram!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Brava!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Flores!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Aruni!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Zero!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Ace!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Wamai!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Kali!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Warden!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Mozzie!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Kaid!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Maestro!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Vigil!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Zofia!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Mute!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Sledge!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Thatcher!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Twitch!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Jager!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Bandit!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Fuze!.id, roleId: r6AntiGadget!.id },
      { characterId: r6Ram!.id, roleId: r6Breach!.id },
      { characterId: r6Ace!.id, roleId: r6Breach!.id },
      { characterId: r6Maverick!.id, roleId: r6Breach!.id },
      { characterId: r6Zofia!.id, roleId: r6Breach!.id },
      { characterId: r6Hibana!.id, roleId: r6Breach!.id },
      { characterId: r6Blackbeard!.id, roleId: r6Breach!.id },
      { characterId: r6Buck!.id, roleId: r6Breach!.id },
      { characterId: r6Sledge!.id, roleId: r6Breach!.id },
      { characterId: r6Ash!.id, roleId: r6Breach!.id },
      { characterId: r6Thermite!.id, roleId: r6Breach!.id },
      { characterId: r6Fenrir!.id, roleId: r6Trapper!.id },
      { characterId: r6Thorn!.id, roleId: r6Trapper!.id },
      { characterId: r6Wamai!.id, roleId: r6Trapper!.id },
      { characterId: r6Goyo!.id, roleId: r6Trapper!.id },
      { characterId: r6Alibi!.id, roleId: r6Trapper!.id },
      { characterId: r6Ela!.id, roleId: r6Trapper!.id },
      { characterId: r6Lesion!.id, roleId: r6Trapper!.id },
      { characterId: r6Frost!.id, roleId: r6Trapper!.id },
      { characterId: r6Smoke!.id, roleId: r6Trapper!.id },
      { characterId: r6Kapkan!.id, roleId: r6Trapper!.id },
      { characterId: r6Grim!.id, roleId: r6FrontLine!.id },
      { characterId: r6Iana!.id, roleId: r6FrontLine!.id },
      { characterId: r6Amaru!.id, roleId: r6FrontLine!.id },
      { characterId: r6Nokk!.id, roleId: r6FrontLine!.id },
      { characterId: r6Nomad!.id, roleId: r6FrontLine!.id },
      { characterId: r6Maverick!.id, roleId: r6FrontLine!.id },
      { characterId: r6Finka!.id, roleId: r6FrontLine!.id },
      { characterId: r6Ying!.id, roleId: r6FrontLine!.id },
      { characterId: r6Hibana!.id, roleId: r6FrontLine!.id },
      { characterId: r6Capitao!.id, roleId: r6FrontLine!.id },
      { characterId: r6Blackbeard!.id, roleId: r6FrontLine!.id },
      { characterId: r6Ash!.id, roleId: r6FrontLine!.id },
      { characterId: r6Blitz!.id, roleId: r6FrontLine!.id },
    ],
  });

  // #endregion

  // #region Settings

  await prisma.titleSetting.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: rainbowSixSiege.id,
        name: "test",
        displayName: "Test",
      },
    ],
  });

  // #endregion

  // #endregion

  // #region Valorant
  const valorant = await prisma.title.upsert({
    where: { name: "valorant" },
    update: { updatedAt: new Date() },
    create: {
      name: "valorant",
      displayName: "Valorant",
      genreId: fpsGenre.id,
    },
  });

  // #region Maps
  await prisma.titleMap.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: valorant.id,
        name: "abyss",
        displayName: "Abyss",
      },
      {
        titleId: valorant.id,
        name: "ascent",
        displayName: "Ascent",
      },
      {
        titleId: valorant.id,
        name: "bind",
        displayName: "Bind",
      },
      {
        titleId: valorant.id,
        name: "breeze",
        displayName: "Breeze",
      },
      {
        titleId: valorant.id,
        name: "corrode",
        displayName: "Corrode",
      },
      {
        titleId: valorant.id,
        name: "fracture",
        displayName: "Fracture",
      },
      {
        titleId: valorant.id,
        name: "haven",
        displayName: "Haven",
      },
      {
        titleId: valorant.id,
        name: "icebox",
        displayName: "Icebox",
      },
      {
        titleId: valorant.id,
        name: "lotus",
        displayName: "Lotus",
      },
      {
        titleId: valorant.id,
        name: "pearl",
        displayName: "Pearl",
      },
      {
        titleId: valorant.id,
        name: "split",
        displayName: "Split",
      },
      {
        titleId: valorant.id,
        name: "sunset",
        displayName: "Sunset",
      },
      {
        titleId: valorant.id,
        name: "district",
        displayName: "District",
      },
      {
        titleId: valorant.id,
        name: "kasbah",
        displayName: "Kasbah",
      },
      {
        titleId: valorant.id,
        name: "piazza",
        displayName: "Piazza",
      },
      {
        titleId: valorant.id,
        name: "drift",
        displayName: "Drift",
      },
      {
        titleId: valorant.id,
        name: "glitch",
        displayName: "Glitch",
      },
    ],
  });
  // #endregion

  // #region Roles

  const [valController, valDuelist, valInitiaitor, valSentinel] =
    await prisma.titleRole.createManyAndReturn({
      skipDuplicates: true,
      data: [
        {
          name: "controller",
          displayName: "Controller",
          titleId: valorant.id,
        },
        {
          name: "duelist",
          displayName: "Duelist",
          titleId: valorant.id,
        },
        {
          name: "initiator",
          displayName: "Initiator",
          titleId: valorant.id,
        },
        {
          name: "sentinel",
          displayName: "Sentinel",
          titleId: valorant.id,
        },
      ],
    });

  // #endregion

  // #region Characters
  const [
    valAstra,
    valBreach,
    valBrimstone,
    valChamber,
    valClove,
    valCypher,
    valDeadlock,
    valFade,
    valGekko,
    valHarbor,
    valIso,
    valJett,
    valKayo,
    valKilljoy,
    valNeon,
    valOmen,
    valPhoenix,
    valRaze,
    valReyna,
    valSage,
    valSkye,
    valSova,
    valTejo,
    valVeto,
    valViper,
    valVyse,
    valWaylay,
    valYoru,
  ] = await prisma.titleCharacter.createManyAndReturn({
    skipDuplicates: true,
    data: [
      {
        titleId: valorant.id,
        name: "astra",
        displayName: "Astra",
      },
      {
        titleId: valorant.id,
        name: "breach",
        displayName: "Breach",
      },
      {
        titleId: valorant.id,
        name: "brimstone",
        displayName: "Brimstone",
      },
      {
        titleId: valorant.id,
        name: "chamber",
        displayName: "Chamber",
      },
      {
        titleId: valorant.id,
        name: "clove",
        displayName: "Clove",
      },
      {
        titleId: valorant.id,
        name: "cypher",
        displayName: "Cypher",
      },
      {
        titleId: valorant.id,
        name: "deadlock",
        displayName: "Deadlock",
      },
      {
        titleId: valorant.id,
        name: "fade",
        displayName: "Fade",
      },
      {
        titleId: valorant.id,
        name: "gekko",
        displayName: "Gekko",
      },
      {
        titleId: valorant.id,
        name: "harbor",
        displayName: "Harbor",
      },
      {
        titleId: valorant.id,
        name: "iso",
        displayName: "Iso",
      },
      {
        titleId: valorant.id,
        name: "jett",
        displayName: "Jett",
      },
      {
        titleId: valorant.id,
        name: "kayo",
        displayName: "KAY/O",
      },
      {
        titleId: valorant.id,
        name: "killjoy",
        displayName: "Killjoy",
      },
      {
        titleId: valorant.id,
        name: "neon",
        displayName: "Neon",
      },
      {
        titleId: valorant.id,
        name: "omen",
        displayName: "Omen",
      },
      {
        titleId: valorant.id,
        name: "phoenix",
        displayName: "Phoenix",
      },
      {
        titleId: valorant.id,
        name: "raze",
        displayName: "Raze",
      },
      {
        titleId: valorant.id,
        name: "reyna",
        displayName: "Reyna",
      },
      {
        titleId: valorant.id,
        name: "sage",
        displayName: "Sage",
      },
      {
        titleId: valorant.id,
        name: "skye",
        displayName: "Skye",
      },
      {
        titleId: valorant.id,
        name: "sova",
        displayName: "Sova",
      },
      {
        titleId: valorant.id,
        name: "tejo",
        displayName: "Tejo",
      },
      {
        titleId: valorant.id,
        name: "veto",
        displayName: "Veto",
      },
      {
        titleId: valorant.id,
        name: "viper",
        displayName: "Viper",
      },
      {
        titleId: valorant.id,
        name: "vyse",
        displayName: "Vyse",
      },
      {
        titleId: valorant.id,
        name: "waylay",
        displayName: "Waylay",
      },
      {
        titleId: valorant.id,
        name: "yoru",
        displayName: "Yoru",
      },
    ],
  });
  // #endregion

  // #region Character Roles

  await prisma.titleCharacterRole.createMany({
    skipDuplicates: true,
    data: [
      { characterId: valBrimstone!.id, roleId: valController!.id },
      { characterId: valViper!.id, roleId: valController!.id },
      { characterId: valOmen!.id, roleId: valController!.id },
      { characterId: valAstra!.id, roleId: valController!.id },
      { characterId: valHarbor!.id, roleId: valController!.id },
      { characterId: valClove!.id, roleId: valController!.id },
      { characterId: valPhoenix!.id, roleId: valDuelist!.id },
      { characterId: valJett!.id, roleId: valDuelist!.id },
      { characterId: valReyna!.id, roleId: valDuelist!.id },
      { characterId: valRaze!.id, roleId: valDuelist!.id },
      { characterId: valYoru!.id, roleId: valDuelist!.id },
      { characterId: valNeon!.id, roleId: valDuelist!.id },
      { characterId: valIso!.id, roleId: valDuelist!.id },
      { characterId: valWaylay!.id, roleId: valDuelist!.id },
      { characterId: valSova!.id, roleId: valInitiaitor!.id },
      { characterId: valBreach!.id, roleId: valInitiaitor!.id },
      { characterId: valSkye!.id, roleId: valInitiaitor!.id },
      { characterId: valKayo!.id, roleId: valInitiaitor!.id },
      { characterId: valFade!.id, roleId: valInitiaitor!.id },
      { characterId: valGekko!.id, roleId: valInitiaitor!.id },
      { characterId: valTejo!.id, roleId: valInitiaitor!.id },
      { characterId: valKilljoy!.id, roleId: valSentinel!.id },
      { characterId: valCypher!.id, roleId: valSentinel!.id },
      { characterId: valSage!.id, roleId: valSentinel!.id },
      { characterId: valChamber!.id, roleId: valSentinel!.id },
      { characterId: valDeadlock!.id, roleId: valSentinel!.id },
      { characterId: valVyse!.id, roleId: valSentinel!.id },
      { characterId: valVeto!.id, roleId: valSentinel!.id },
    ],
  });

  // #endregion

  // #region Gamemodes
  await prisma.titleGamemode.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: valorant.id,
        name: "deathmatch",
        displayName: "Deathmatch",
      },
      {
        titleId: valorant.id,
        name: "escalation",
        displayName: "Escalation",
      },
      {
        titleId: valorant.id,
        name: "replication",
        displayName: "Replication",
      },
      {
        titleId: valorant.id,
        name: "snowball fight",
        displayName: "Snowball Fight",
      },
      {
        titleId: valorant.id,
        name: "team deathmatch",
        displayName: "Team Deathmatch",
      },
      {
        titleId: valorant.id,
        name: "skimish",
        displayName: "Skirmish",
      },
      {
        titleId: valorant.id,
        name: "spike rush",
        displayName: "Spike Rush",
      },
      {
        titleId: valorant.id,
        name: "swiftplay",
        displayName: "Swiftplay",
      },
      {
        titleId: valorant.id,
        name: "plant/defuse",
        displayName: "Plant/Defuse",
      },
    ],
  });
  // #endregion

  // #endregion

  // #region CS:GO 2

  const csgo2 = await prisma.title.upsert({
    where: { name: "csgo2" },
    update: { updatedAt: new Date() },
    create: {
      name: "csgo2",
      displayName: "CSGO 2",
      genreId: fpsGenre.id,
    },
  });

  // #region Maps
  await prisma.titleMap.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: csgo2.id,
        name: "ancient",
        displayName: "Ancient",
      },
      {
        titleId: csgo2.id,
        name: "dust ii",
        displayName: "Dust II",
      },
      {
        titleId: csgo2.id,
        name: "inferno",
        displayName: "Inferno",
      },
      {
        titleId: csgo2.id,
        name: "mirage",
        displayName: "Mirage",
      },
      {
        titleId: csgo2.id,
        name: "nuke",
        displayName: "Nuke",
      },
      {
        titleId: csgo2.id,
        name: "overpass",
        displayName: "Overpass",
      },
      {
        titleId: csgo2.id,
        name: "train",
        displayName: "Train",
      },
      {
        titleId: csgo2.id,
        name: "vertigo",
        displayName: "Vertigo",
      },
      {
        titleId: csgo2.id,
        name: "anubis",
        displayName: "Anubis",
      },
      {
        titleId: csgo2.id,
        name: "office",
        displayName: "Office",
      },
      {
        titleId: csgo2.id,
        name: "italy",
        displayName: "Italy",
      },
      {
        titleId: csgo2.id,
        name: "agency",
        displayName: "Agency",
      },
      {
        titleId: csgo2.id,
        name: "baggage",
        displayName: "Baggage",
      },
      {
        titleId: csgo2.id,
        name: "shoots",
        displayName: "Shoots",
      },
      {
        titleId: csgo2.id,
        name: "pool day",
        displayName: "Pool Day",
      },
    ],
  });
  // #endregion

  // #region Gamemodes
  await prisma.titleGamemode.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: csgo2.id,
        name: "hostage",
        displayName: "Hostage",
      },
      {
        titleId: csgo2.id,
        name: "bomb",
        displayName: "Bomb",
      },
      {
        titleId: csgo2.id,
        name: "wingman",
        displayName: "Wingman",
      },
      {
        titleId: csgo2.id,
        name: "arms race",
        displayName: "Arms Race",
      },
      {
        titleId: csgo2.id,
        name: "demolition",
        displayName: "Demolition",
      },
      {
        titleId: csgo2.id,
        name: "deathmatch",
        displayName: "Deathmatch",
      },
      {
        titleId: csgo2.id,
        name: "danger zone",
        displayName: "Danger Zone",
      },
    ],
  });
  // #endregion

  // #endregion

  // #region Rocket League
  const rocketLeague = await prisma.title.upsert({
    where: { name: "rocket league" },
    update: { updatedAt: new Date() },
    create: {
      name: "rocket league",
      displayName: "Rocket League",
      genreId: sportsGenre.id,
    },
  });

  // #region Maps
  await prisma.titleMap.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: rocketLeague.id,
        name: "beckwith park",
        displayName: "Beckwith Park",
      },
      {
        titleId: rocketLeague.id,
        name: "dfh stadium",
        displayName: "DFH Stadium",
      },
      {
        titleId: rocketLeague.id,
        name: "mannfield",
        displayName: "Mannfield",
      },
      {
        titleId: rocketLeague.id,
        name: "urban central",
        displayName: "Urban Central",
      },
      {
        titleId: rocketLeague.id,
        name: "utopia coliseum",
        displayName: "Utopia Coliseum",
      },
      {
        titleId: rocketLeague.id,
        name: "wasteland",
        displayName: "Wasteland",
      },
      {
        titleId: rocketLeague.id,
        name: "neo tokyo",
        displayName: "Neo Tokyo",
      },
      {
        titleId: rocketLeague.id,
        name: "aquadome",
        displayName: "Aquadome",
      },
      {
        titleId: rocketLeague.id,
        name: "starbase arc",
        displayName: "Starbase ARC",
      },
      {
        titleId: rocketLeague.id,
        name: "champions field",
        displayName: "Champions Field",
      },
      {
        titleId: rocketLeague.id,
        name: "salty shores",
        displayName: "Salty Shores",
      },
      {
        titleId: rocketLeague.id,
        name: "farmstead",
        displayName: "Farmstead",
      },
      {
        titleId: rocketLeague.id,
        name: "forbidden temple",
        displayName: "Forbidden Temple",
      },
      {
        titleId: rocketLeague.id,
        name: "sovereign heights",
        displayName: "Sovereign Heights",
      },
      {
        titleId: rocketLeague.id,
        name: "deadeye canyon",
        displayName: "Deadeye Canyon",
      },
      {
        titleId: rocketLeague.id,
        name: "rivals arena",
        displayName: "Rivals Arena",
      },
      {
        titleId: rocketLeague.id,
        name: "neon fields",
        displayName: "Neon Fields",
      },
      {
        titleId: rocketLeague.id,
        name: "estadio vida",
        displayName: "Estadio Vida",
      },
      {
        titleId: rocketLeague.id,
        name: "arctagon",
        displayName: "ARCtagon",
      },
      {
        titleId: rocketLeague.id,
        name: "badlands",
        displayName: "Badlands",
      },
      {
        titleId: rocketLeague.id,
        name: "throwback stadium",
        displayName: "Throwback Stadium",
      },
      {
        titleId: rocketLeague.id,
        name: "tokyo underpass",
        displayName: "Tokyo Underpass",
      },
      {
        titleId: rocketLeague.id,
        name: "core 707",
        displayName: "Core 707",
      },
      {
        titleId: rocketLeague.id,
        name: "dunk house",
        displayName: "Dunk House",
      },
      {
        titleId: rocketLeague.id,
        name: "the block",
        displayName: "The Block",
      },
    ],
  });
  // #endregion

  // #region Gamemodes
  await prisma.titleGamemode.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: rocketLeague.id,
        name: "soccar",
        displayName: "Soccar",
      },
      {
        titleId: rocketLeague.id,
        name: "hoops",
        displayName: "Hoops",
      },
      {
        titleId: rocketLeague.id,
        name: "snow day",
        displayName: "Snow Day",
      },
      {
        titleId: rocketLeague.id,
        name: "dropshot",
        displayName: "Dropshot",
      },
      {
        titleId: rocketLeague.id,
        name: "rumble",
        displayName: "Rumble",
      },
      {
        titleId: rocketLeague.id,
        name: "heatseeker",
        displayName: "Heatseeker",
      },
    ],
  });
  // #endregion

  // #endregion

  // #region Overwatch
  const overwatch2 = await prisma.title.upsert({
    where: { name: "overwatch 2" },
    update: { updatedAt: new Date() },
    create: {
      name: "overwatch 2",
      displayName: "Overwatch 2",
      genreId: fpsGenre.id,
      allowsDraws: true,
      defaultDrawPolicy: "TIEBREAKER",
    },
  });

  // #region Maps
  await prisma.titleMap.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: overwatch2.id,
        name: "busan",
        displayName: "Busan",
      },
      {
        titleId: overwatch2.id,
        name: "ilios",
        displayName: "Ilios",
      },
      {
        titleId: overwatch2.id,
        name: "lijiang tower",
        displayName: "Lijiang Tower",
      },
      {
        titleId: overwatch2.id,
        name: "nepal",
        displayName: "Nepal",
      },
      {
        titleId: overwatch2.id,
        name: "oasis",
        displayName: "Oasis",
      },
      {
        titleId: overwatch2.id,
        name: "antarctica peninsula",
        displayName: "Antarctica Peninsula",
      },
      {
        titleId: overwatch2.id,
        name: "samoa",
        displayName: "Samoa",
      },
      {
        titleId: overwatch2.id,
        name: "Arena Victoriae",
        displayName: "arena victoriae",
      },
      {
        titleId: overwatch2.id,
        name: "gogadoro",
        displayName: "Gogadoro",
      },
      {
        titleId: overwatch2.id,
        name: "talantis",
        displayName: "Talantis",
      },
      {
        titleId: overwatch2.id,
        name: "circuit royal",
        displayName: "Circuit Royal",
      },
      {
        titleId: overwatch2.id,
        name: "dorado",
        displayName: "Dorado",
      },
      {
        titleId: overwatch2.id,
        name: "havana",
        displayName: "Havana",
      },
      {
        titleId: overwatch2.id,
        name: "junkertown",
        displayName: "Junkertown",
      },
      {
        titleId: overwatch2.id,
        name: "rialto",
        displayName: "Rialto",
      },
      {
        titleId: overwatch2.id,
        name: "route 66",
        displayName: "Route 66",
      },
      {
        titleId: overwatch2.id,
        name: "shambali monastery",
        displayName: "Shambali Monastery",
      },
      {
        titleId: overwatch2.id,
        name: "watchpoint: gibraltar",
        displayName: "Watchpoint: Gibraltar",
      },
      {
        titleId: overwatch2.id,
        name: "blizzard world",
        displayName: "Blizzard World",
      },
      {
        titleId: overwatch2.id,
        name: "eichenwalde",
        displayName: "Eichenwalde",
      },
      {
        titleId: overwatch2.id,
        name: "hollywood",
        displayName: "Hollywood",
      },
      {
        titleId: overwatch2.id,
        name: "king's row",
        displayName: "King's Row",
      },
      {
        titleId: overwatch2.id,
        name: "midtown",
        displayName: "Midtown",
      },
      {
        titleId: overwatch2.id,
        name: "numbani",
        displayName: "Numbani",
      },
      {
        titleId: overwatch2.id,
        name: "paraiso",
        displayName: "Paraíso",
      },
      {
        titleId: overwatch2.id,
        name: "new junk city",
        displayName: "New Junk City",
      },
      {
        titleId: overwatch2.id,
        name: "colosseo",
        displayName: "Colosseo",
      },
      {
        titleId: overwatch2.id,
        name: "esperanca",
        displayName: "Esperança",
      },
      {
        titleId: overwatch2.id,
        name: "new queen street",
        displayName: "New Queen Street",
      },
      {
        titleId: overwatch2.id,
        name: "runasapi",
        displayName: "Runasapi",
      },
      {
        titleId: overwatch2.id,
        name: "place lacroix",
        displayName: "Place Lacroix",
      },
      {
        titleId: overwatch2.id,
        name: "redwood dam",
        displayName: "Redwood Dam",
      },
      {
        titleId: overwatch2.id,
        name: "aatlis",
        displayName: "Aatlis",
      },
      {
        titleId: overwatch2.id,
        name: "suravasa",
        displayName: "Suravasa",
      },
      {
        titleId: overwatch2.id,
        name: "hanaoka",
        displayName: "Hanaoka",
      },
      {
        titleId: overwatch2.id,
        name: "throne of anubis",
        displayName: "Throne of Anubis",
      },
    ],
  });
  // #endregion

  // #region Roles

  const [ow2Tank, ow2Damage, ow2Support] =
    await prisma.titleRole.createManyAndReturn({
      skipDuplicates: true,
      data: [
        {
          name: "tank",
          displayName: "Tank",
          titleId: overwatch2.id,
        },
        {
          name: "damage",
          displayName: "Damage",
          titleId: overwatch2.id,
        },
        {
          name: "support",
          displayName: "Support",
          titleId: overwatch2.id,
        },
      ],
    });

  // #endregion

  // #region Characters
  const [
    ow2Dva,
    ow2Doomfist,
    ow2Hazard,
    ow2JunkerQueen,
    ow2Mauga,
    ow2Orisa,
    ow2Ramattra,
    ow2Reinhardt,
    ow2Roadhog,
    ow2Sigma,
    ow2Winston,
    ow2WreckingBall,
    ow2Zarya,
    ow2Ashe,
    ow2Bastion,
    ow2Cassidy,
    ow2Echo,
    ow2Freja,
    ow2Genji,
    ow2Hanzo,
    ow2Junkrat,
    ow2Mei,
    ow2Pharah,
    ow2Reaper,
    ow2Sojourn,
    ow2Soldier76,
    ow2Sombra,
    ow2Symmetra,
    ow2Torbjorn,
    ow2Tracer,
    ow2Venture,
    ow2Widowmaker,
    ow2Ana,
    ow2Baptiste,
    ow2Brigitte,
    ow2Illari,
    ow2Juno,
    ow2Kiriko,
    ow2Lifeweaver,
    ow2Lucio,
    ow2Mercy,
    ow2Moira,
    ow2Zenyatta,
    ow2Wuyang,
  ] = await prisma.titleCharacter.createManyAndReturn({
    skipDuplicates: true,
    data: [
      {
        titleId: overwatch2.id,
        name: "d.va",
        displayName: "D.Va",
      },
      {
        titleId: overwatch2.id,
        name: "doomfist",
        displayName: "Doomfist",
      },
      {
        titleId: overwatch2.id,
        name: "hazard",
        displayName: "Hazard",
      },
      {
        titleId: overwatch2.id,
        name: "junker queen",
        displayName: "Junker Queen",
      },
      {
        titleId: overwatch2.id,
        name: "mauga",
        displayName: "Mauga",
      },
      {
        titleId: overwatch2.id,
        name: "orisa",
        displayName: "Orisa",
      },
      {
        titleId: overwatch2.id,
        name: "ramattra",
        displayName: "Ramattra",
      },
      {
        titleId: overwatch2.id,
        name: "reinhardt",
        displayName: "Reinhardt",
      },
      {
        titleId: overwatch2.id,
        name: "roadhog",
        displayName: "Roadhog",
      },
      {
        titleId: overwatch2.id,
        name: "sigma",
        displayName: "Sigma",
      },
      {
        titleId: overwatch2.id,
        name: "winston",
        displayName: "Winston",
      },
      {
        titleId: overwatch2.id,
        name: "wrecking ball",
        displayName: "Wrecking Ball",
      },
      {
        titleId: overwatch2.id,
        name: "zarya",
        displayName: "Zarya",
      },
      {
        titleId: overwatch2.id,
        name: "ashe",
        displayName: "Ashe",
      },
      {
        titleId: overwatch2.id,
        name: "bastion",
        displayName: "Bastion",
      },
      {
        titleId: overwatch2.id,
        name: "cassidy",
        displayName: "Cassidy",
      },
      {
        titleId: overwatch2.id,
        name: "echo",
        displayName: "Echo",
      },
      {
        titleId: overwatch2.id,
        name: "freja",
        displayName: "Freja",
      },
      {
        titleId: overwatch2.id,
        name: "genji",
        displayName: "Genji",
      },
      {
        titleId: overwatch2.id,
        name: "hanzo",
        displayName: "Hanzo",
      },
      {
        titleId: overwatch2.id,
        name: "junkrat",
        displayName: "Junkrat",
      },
      {
        titleId: overwatch2.id,
        name: "mei",
        displayName: "Mei",
      },
      {
        titleId: overwatch2.id,
        name: "pharah",
        displayName: "Pharah",
      },
      {
        titleId: overwatch2.id,
        name: "reaper",
        displayName: "Reaper",
      },
      {
        titleId: overwatch2.id,
        name: "sojourn",
        displayName: "Sojourn",
      },
      {
        titleId: overwatch2.id,
        name: "soldier: 76",
        displayName: "Soldier: 76",
      },
      {
        titleId: overwatch2.id,
        name: "sombra",
        displayName: "Sombra",
      },
      {
        titleId: overwatch2.id,
        name: "symmetra",
        displayName: "Symmetra",
      },
      {
        titleId: overwatch2.id,
        name: "torbjorn",
        displayName: "Torbjörn",
      },
      {
        titleId: overwatch2.id,
        name: "tracer",
        displayName: "Tracer",
      },
      {
        titleId: overwatch2.id,
        name: "venture",
        displayName: "Venture",
      },
      {
        titleId: overwatch2.id,
        name: "widowmaker",
        displayName: "Widowmaker",
      },
      {
        titleId: overwatch2.id,
        name: "ana",
        displayName: "Ana",
      },
      {
        titleId: overwatch2.id,
        name: "baptiste",
        displayName: "Baptiste",
      },
      {
        titleId: overwatch2.id,
        name: "brigitte",
        displayName: "Brigitte",
      },
      {
        titleId: overwatch2.id,
        name: "illari",
        displayName: "Illari",
      },
      {
        titleId: overwatch2.id,
        name: "juno",
        displayName: "Juno",
      },
      {
        titleId: overwatch2.id,
        name: "kiriko",
        displayName: "Kiriko",
      },
      {
        titleId: overwatch2.id,
        name: "lifeweaver",
        displayName: "Lifeweaver",
      },
      {
        titleId: overwatch2.id,
        name: "lucio",
        displayName: "Lúcio",
      },
      {
        titleId: overwatch2.id,
        name: "mercy",
        displayName: "Mercy",
      },
      {
        titleId: overwatch2.id,
        name: "moira",
        displayName: "Moira",
      },
      {
        titleId: overwatch2.id,
        name: "zenyatta",
        displayName: "Zenyatta",
      },
      {
        titleId: overwatch2.id,
        name: "wuyang",
        displayName: "Wuyang",
      },
    ],
  });
  // #endregion

  // #region Character Roles

  await prisma.titleCharacterRole.createMany({
    skipDuplicates: true,
    data: [
      { characterId: ow2Dva!.id, roleId: ow2Tank!.id },
      { characterId: ow2Doomfist!.id, roleId: ow2Tank!.id },
      { characterId: ow2Hazard!.id, roleId: ow2Tank!.id },
      { characterId: ow2JunkerQueen!.id, roleId: ow2Tank!.id },
      { characterId: ow2Mauga!.id, roleId: ow2Tank!.id },
      { characterId: ow2Orisa!.id, roleId: ow2Tank!.id },
      { characterId: ow2Ramattra!.id, roleId: ow2Tank!.id },
      { characterId: ow2Reinhardt!.id, roleId: ow2Tank!.id },
      { characterId: ow2Roadhog!.id, roleId: ow2Tank!.id },
      { characterId: ow2Sigma!.id, roleId: ow2Tank!.id },
      { characterId: ow2Winston!.id, roleId: ow2Tank!.id },
      { characterId: ow2WreckingBall!.id, roleId: ow2Tank!.id },
      { characterId: ow2Zarya!.id, roleId: ow2Tank!.id },
      { characterId: ow2Ashe!.id, roleId: ow2Damage!.id },
      { characterId: ow2Bastion!.id, roleId: ow2Damage!.id },
      { characterId: ow2Cassidy!.id, roleId: ow2Damage!.id },
      { characterId: r6Echo!.id, roleId: ow2Damage!.id },
      { characterId: ow2Freja!.id, roleId: ow2Damage!.id },
      { characterId: ow2Genji!.id, roleId: ow2Damage!.id },
      { characterId: ow2Hanzo!.id, roleId: ow2Damage!.id },
      { characterId: ow2Junkrat!.id, roleId: ow2Damage!.id },
      { characterId: ow2Mei!.id, roleId: ow2Damage!.id },
      { characterId: ow2Pharah!.id, roleId: ow2Damage!.id },
      { characterId: ow2Reaper!.id, roleId: ow2Damage!.id },
      { characterId: ow2Sojourn!.id, roleId: ow2Damage!.id },
      { characterId: ow2Soldier76!.id, roleId: ow2Damage!.id },
      { characterId: ow2Sombra!.id, roleId: ow2Damage!.id },
      { characterId: ow2Symmetra!.id, roleId: ow2Damage!.id },
      { characterId: ow2Torbjorn!.id, roleId: ow2Damage!.id },
      { characterId: ow2Tracer!.id, roleId: ow2Damage!.id },
      { characterId: ow2Venture!.id, roleId: ow2Damage!.id },
      { characterId: ow2Widowmaker!.id, roleId: ow2Damage!.id },
      { characterId: ow2Ana!.id, roleId: ow2Support!.id },
      { characterId: ow2Baptiste!.id, roleId: ow2Support!.id },
      { characterId: ow2Brigitte!.id, roleId: ow2Support!.id },
      { characterId: ow2Illari!.id, roleId: ow2Support!.id },
      { characterId: ow2Juno!.id, roleId: ow2Support!.id },
      { characterId: ow2Kiriko!.id, roleId: ow2Support!.id },
      { characterId: ow2Lifeweaver!.id, roleId: ow2Support!.id },
      { characterId: ow2Lucio!.id, roleId: ow2Support!.id },
      { characterId: ow2Mercy!.id, roleId: ow2Support!.id },
      { characterId: ow2Moira!.id, roleId: ow2Support!.id },
      { characterId: ow2Wuyang!.id, roleId: ow2Support!.id },
      { characterId: ow2Zenyatta!.id, roleId: ow2Support!.id },
    ],
  });

  // #endregion

  // #region Gamemodes
  await prisma.titleGamemode.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: overwatch2.id,
        name: "control",
        displayName: "Control",
      },
      {
        titleId: overwatch2.id,
        name: "escort",
        displayName: "Escort",
      },
      {
        titleId: overwatch2.id,
        name: "flashpoint",
        displayName: "Flashpoint",
      },
      {
        titleId: overwatch2.id,
        name: "hybrid",
        displayName: "Hybrid",
      },
      {
        titleId: overwatch2.id,
        name: "push",
        displayName: "Push",
      },
      {
        titleId: overwatch2.id,
        name: "clash",
        displayName: "Clash",
      },
      {
        titleId: overwatch2.id,
        name: "deathmatch",
        displayName: "Deathmatch",
      },
      {
        titleId: overwatch2.id,
        name: "capture the flag",
        displayName: "Capture the Flag",
      },
    ],
  });
  // #endregion

  // #endregion

  // #region League of Legends
  const leagueOfLegends = await prisma.title.upsert({
    where: { name: "league of legends" },
    update: { updatedAt: new Date() },
    create: {
      name: "league of legends",
      displayName: "League of Legends",
      genreId: mobaGenre.id,
    },
  });

  // #region Gamemodes
  await prisma.titleGamemode.createMany({
    skipDuplicates: true,
    data: [
      {
        titleId: leagueOfLegends.id,
        name: "classic",
        displayName: "Classic Summoner's Rift and Twisted Treeline games",
      },
      {
        titleId: leagueOfLegends.id,
        name: "aram",
        displayName: "ARAM games",
      },
    ],
  });

  // #endregion

  // #region Roles

  const [lolTop, lolMiddle, lolJungle, lolBottom, lolSupport] =
    await prisma.titleRole.createManyAndReturn({
      skipDuplicates: true,
      data: [
        {
          name: "top",
          displayName: "Top",
          titleId: leagueOfLegends.id,
        },
        {
          name: "middle",
          displayName: "Middle",
          titleId: leagueOfLegends.id,
        },
        {
          name: "jungle",
          displayName: "Jungle",
          titleId: leagueOfLegends.id,
        },
        {
          name: "bottom",
          displayName: "Bottom",
          titleId: leagueOfLegends.id,
        },
        {
          name: "support",
          displayName: "Support",
          titleId: leagueOfLegends.id,
        },
      ],
    });

  // #endregion

  // #region Characters
  const [
    lolAatrox,
    lolAhri,
    lolAkali,
    lolAkshan,
    lolAlistar,
    lolAmumu,
    lolAnivia,
    lolAnnie,
    lolAphelios,
    lolAshe,
    lolAurelionsol,
    lolAurora,
    lolAzir,
    lolBard,
    lolBelveth,
    lolBlitzcrank,
    lolBrand,
    lolBraum,
    lolBriar,
    lolCaitlyn,
    lolCamille,
    lolCassiopeia,
    lolChogath,
    lolCorki,
    lolDarius,
    lolDiana,
    lolDrMundo,
    lolDraven,
    lolEkko,
    lolElise,
    lolEvelynn,
    lolEzreal,
    lolFiddlesticks,
    lolFiora,
    lolFizz,
    lolGalio,
    lolGangplank,
    lolGaren,
    lolGnar,
    lolGragas,
    lolGraves,
    lolGwen,
    lolHecarim,
    lolHeimerdinger,
    lolHwei,
    lolIllaoi,
    lolIrelia,
    lolIvern,
    lolJanna,
    lolJarvanIV,
    lolJax,
    lolJayce,
    lolJhin,
    lolJinx,
    lolKsante,
    lolKaisa,
    lolKalista,
    lolKarma,
    lolKarthus,
    lolKassadin,
    lolKatarina,
    lolKayle,
    lolKayn,
    lolKennen,
    lolKhazix,
    lolKindred,
    lolKled,
    lolKogMaw,
    lolLeblanc,
    lolLeeSin,
    lolLeona,
    lolLillia,
    lolLissandra,
    lolLucian,
    lolLulu,
    lolLux,
    lolMalphite,
    lolMalzahar,
    lolMaokai,
    lolMasterYi,
    lolMilio,
    lolMissFortune,
    lolMordekaiser,
    lolMorgana,
    lolNaafiri,
    lolNami,
    lolNasus,
    lolNautilus,
    lolNeeko,
    lolNidalee,
    lolNilah,
    lolNocturne,
    lolNunu,
    lolOlaf,
    lolOrianna,
    lolOrnn,
    lolPantheon,
    lolPoppy,
    lolPyke,
    lolQiyana,
    lolQuinn,
    lolRakan,
    lolRammus,
    lolReksai,
    lolRell,
    lolRenata,
    lolRenekton,
    lolRengar,
    lolRiven,
    lolRumble,
    lolRyze,
    lolSamira,
    lolSejuani,
    lolSenna,
    lolSeraphine,
    lolSett,
    lolShaco,
    lolShen,
    lolShyvana,
    lolSinged,
    lolSion,
    lolSivir,
    lolSkarner,
    lolSmolder,
    lolSona,
    lolSoraka,
    lolSwain,
    lolSylas,
    lolSyndra,
    lolTahmKench,
    lolTaliyah,
    lolTalon,
    lolTaric,
    lolTeemo,
    lolThresh,
    lolTristana,
    lolTrundle,
    lolTryndamere,
    lolTwistedFate,
    lolTwitch,
    lolUdyr,
    lolUrgot,
    lolVarus,
    lolVayne,
    lolVeigar,
    lolVelkoz,
    lolVex,
    lolVi,
    lolViego,
    lolViktor,
    lolVladimir,
    lolVolibear,
    lolWarwick,
    lolWukong,
    lolXayah,
    lolXerath,
    lolXinzhao,
    lolYasuo,
    lolYone,
    lolYorick,
    lolYuumi,
    lolZac,
    lolZed,
    lolZeri,
    lolZiggs,
    lolZilean,
    lolZoe,
    lolZyra,
  ] = await prisma.titleCharacter.createManyAndReturn({
    skipDuplicates: true,
    data: [
      {
        titleId: leagueOfLegends.id,
        name: "aatrox",
        displayName: "Aatrox",
      },
      {
        titleId: leagueOfLegends.id,
        name: "ahri",
        displayName: "Ahri",
      },
      {
        titleId: leagueOfLegends.id,
        name: "akali",
        displayName: "Akali",
      },
      {
        titleId: leagueOfLegends.id,
        name: "akshan",
        displayName: "Akshan",
      },
      {
        titleId: leagueOfLegends.id,
        name: "alistar",
        displayName: "Alistar",
      },
      {
        titleId: leagueOfLegends.id,
        name: "amumu",
        displayName: "Amumu",
      },
      {
        titleId: leagueOfLegends.id,
        name: "anivia",
        displayName: "Anivia",
      },
      {
        titleId: leagueOfLegends.id,
        name: "annie",
        displayName: "Annie",
      },
      {
        titleId: leagueOfLegends.id,
        name: "aphelios",
        displayName: "Aphelios",
      },
      {
        titleId: leagueOfLegends.id,
        name: "ashe",
        displayName: "Ashe",
      },
      {
        titleId: leagueOfLegends.id,
        name: "aurelionsol",
        displayName: "Aurelion Sol",
      },
      {
        titleId: leagueOfLegends.id,
        name: "aurora",
        displayName: "Aurora",
      },
      {
        titleId: leagueOfLegends.id,
        name: "azir",
        displayName: "Azir",
      },
      {
        titleId: leagueOfLegends.id,
        name: "bard",
        displayName: "Bard",
      },
      {
        titleId: leagueOfLegends.id,
        name: "belveth",
        displayName: "Bel'Veth",
      },
      {
        titleId: leagueOfLegends.id,
        name: "blitzcrank",
        displayName: "Blitzcrank",
      },
      {
        titleId: leagueOfLegends.id,
        name: "brand",
        displayName: "Brand",
      },
      {
        titleId: leagueOfLegends.id,
        name: "braum",
        displayName: "Braum",
      },
      {
        titleId: leagueOfLegends.id,
        name: "briar",
        displayName: "Briar",
      },
      {
        titleId: leagueOfLegends.id,
        name: "caitlyn",
        displayName: "Caitlyn",
      },
      {
        titleId: leagueOfLegends.id,
        name: "camille",
        displayName: "Camille",
      },
      {
        titleId: leagueOfLegends.id,
        name: "cassiopeia",
        displayName: "Cassiopeia",
      },
      {
        titleId: leagueOfLegends.id,
        name: "chogath",
        displayName: "Cho'Gath",
      },
      {
        titleId: leagueOfLegends.id,
        name: "corki",
        displayName: "Corki",
      },
      {
        titleId: leagueOfLegends.id,
        name: "darius",
        displayName: "Darius",
      },
      {
        titleId: leagueOfLegends.id,
        name: "diana",
        displayName: "Diana",
      },
      {
        titleId: leagueOfLegends.id,
        name: "drMundo",
        displayName: "Dr. Mundo",
      },
      {
        titleId: leagueOfLegends.id,
        name: "draven",
        displayName: "Draven",
      },
      {
        titleId: leagueOfLegends.id,
        name: "ekko",
        displayName: "Ekko",
      },
      {
        titleId: leagueOfLegends.id,
        name: "elise",
        displayName: "Elise",
      },
      {
        titleId: leagueOfLegends.id,
        name: "evelynn",
        displayName: "Evelynn",
      },
      {
        titleId: leagueOfLegends.id,
        name: "ezreal",
        displayName: "Ezreal",
      },
      {
        titleId: leagueOfLegends.id,
        name: "fiddlesticks",
        displayName: "Fiddlesticks",
      },
      {
        titleId: leagueOfLegends.id,
        name: "fiora",
        displayName: "Fiora",
      },
      {
        titleId: leagueOfLegends.id,
        name: "fizz",
        displayName: "Fizz",
      },
      {
        titleId: leagueOfLegends.id,
        name: "galio",
        displayName: "Galio",
      },
      {
        titleId: leagueOfLegends.id,
        name: "gangplank",
        displayName: "Gangplank",
      },
      {
        titleId: leagueOfLegends.id,
        name: "garen",
        displayName: "Garen",
      },
      {
        titleId: leagueOfLegends.id,
        name: "gnar",
        displayName: "Gnar",
      },
      {
        titleId: leagueOfLegends.id,
        name: "gragas",
        displayName: "Gragas",
      },
      {
        titleId: leagueOfLegends.id,
        name: "graves",
        displayName: "Graves",
      },
      {
        titleId: leagueOfLegends.id,
        name: "gwen",
        displayName: "Gwen",
      },
      {
        titleId: leagueOfLegends.id,
        name: "hecarim",
        displayName: "Hecarim",
      },
      {
        titleId: leagueOfLegends.id,
        name: "heimerdinger",
        displayName: "Heimerdinger",
      },
      {
        titleId: leagueOfLegends.id,
        name: "hwei",
        displayName: "Hwei",
      },
      {
        titleId: leagueOfLegends.id,
        name: "illaoi",
        displayName: "Illaoi",
      },
      {
        titleId: leagueOfLegends.id,
        name: "irelia",
        displayName: "Irelia",
      },
      {
        titleId: leagueOfLegends.id,
        name: "ivern",
        displayName: "Ivern",
      },
      {
        titleId: leagueOfLegends.id,
        name: "janna",
        displayName: "Janna",
      },
      {
        titleId: leagueOfLegends.id,
        name: "jarvanIV",
        displayName: "Jarvan IV",
      },
      {
        titleId: leagueOfLegends.id,
        name: "jax",
        displayName: "Jax",
      },
      {
        titleId: leagueOfLegends.id,
        name: "jayce",
        displayName: "Jayce",
      },
      {
        titleId: leagueOfLegends.id,
        name: "jhin",
        displayName: "Jhin",
      },
      {
        titleId: leagueOfLegends.id,
        name: "jinx",
        displayName: "Jinx",
      },
      {
        titleId: leagueOfLegends.id,
        name: "k'sante",
        displayName: "K'Sante",
      },
      {
        titleId: leagueOfLegends.id,
        name: "kaisa",
        displayName: "Kai'Sa",
      },
      {
        titleId: leagueOfLegends.id,
        name: "kalista",
        displayName: "Kalista",
      },
      {
        titleId: leagueOfLegends.id,
        name: "karma",
        displayName: "Karma",
      },
      {
        titleId: leagueOfLegends.id,
        name: "karthus",
        displayName: "Karthus",
      },
      {
        titleId: leagueOfLegends.id,
        name: "kassadin",
        displayName: "Kassadin",
      },
      {
        titleId: leagueOfLegends.id,
        name: "katarina",
        displayName: "Katarina",
      },
      {
        titleId: leagueOfLegends.id,
        name: "kayle",
        displayName: "Kayle",
      },
      {
        titleId: leagueOfLegends.id,
        name: "kayn",
        displayName: "Kayn",
      },
      {
        titleId: leagueOfLegends.id,
        name: "kennen",
        displayName: "Kennen",
      },
      {
        titleId: leagueOfLegends.id,
        name: "khazix",
        displayName: "Kha'Zix",
      },
      {
        titleId: leagueOfLegends.id,
        name: "kindred",
        displayName: "Kindred",
      },
      {
        titleId: leagueOfLegends.id,
        name: "kled",
        displayName: "Kled",
      },
      {
        titleId: leagueOfLegends.id,
        name: "kogMaw",
        displayName: "Kog'Maw",
      },
      {
        titleId: leagueOfLegends.id,
        name: "leblanc",
        displayName: "LeBlanc",
      },
      {
        titleId: leagueOfLegends.id,
        name: "leeSin",
        displayName: "Lee Sin",
      },
      {
        titleId: leagueOfLegends.id,
        name: "leona",
        displayName: "Leona",
      },
      {
        titleId: leagueOfLegends.id,
        name: "lillia",
        displayName: "Lillia",
      },
      {
        titleId: leagueOfLegends.id,
        name: "lissandra",
        displayName: "Lissandra",
      },
      {
        titleId: leagueOfLegends.id,
        name: "lucian",
        displayName: "Lucian",
      },
      {
        titleId: leagueOfLegends.id,
        name: "lulu",
        displayName: "Lulu",
      },
      {
        titleId: leagueOfLegends.id,
        name: "lux",
        displayName: "Lux",
      },
      {
        titleId: leagueOfLegends.id,
        name: "malphite",
        displayName: "Malphite",
      },
      {
        titleId: leagueOfLegends.id,
        name: "malzahar",
        displayName: "Malzahar",
      },
      {
        titleId: leagueOfLegends.id,
        name: "maokai",
        displayName: "Maokai",
      },
      {
        titleId: leagueOfLegends.id,
        name: "masterYi",
        displayName: "Master Yi",
      },
      {
        titleId: leagueOfLegends.id,
        name: "milio",
        displayName: "Milio",
      },
      {
        titleId: leagueOfLegends.id,
        name: "missFortune",
        displayName: "Miss Fortune",
      },
      {
        titleId: leagueOfLegends.id,
        name: "mordekaiser",
        displayName: "Mordekaiser",
      },
      {
        titleId: leagueOfLegends.id,
        name: "morgana",
        displayName: "Morgana",
      },
      {
        titleId: leagueOfLegends.id,
        name: "naafiri",
        displayName: "Naafiri",
      },
      {
        titleId: leagueOfLegends.id,
        name: "nami",
        displayName: "Nami",
      },
      {
        titleId: leagueOfLegends.id,
        name: "nasus",
        displayName: "Nasus",
      },
      {
        titleId: leagueOfLegends.id,
        name: "nautilus",
        displayName: "Nautilus",
      },
      {
        titleId: leagueOfLegends.id,
        name: "neeko",
        displayName: "Neeko",
      },
      {
        titleId: leagueOfLegends.id,
        name: "nidalee",
        displayName: "Nidalee",
      },
      {
        titleId: leagueOfLegends.id,
        name: "nilah",
        displayName: "Nilah",
      },
      {
        titleId: leagueOfLegends.id,
        name: "nocturne",
        displayName: "Nocturne",
      },
      {
        titleId: leagueOfLegends.id,
        name: "nunu",
        displayName: "Nunu & Willump",
      },
      {
        titleId: leagueOfLegends.id,
        name: "olaf",
        displayName: "Olaf",
      },
      {
        titleId: leagueOfLegends.id,
        name: "orianna",
        displayName: "Orianna",
      },
      {
        titleId: leagueOfLegends.id,
        name: "ornn",
        displayName: "Ornn",
      },
      {
        titleId: leagueOfLegends.id,
        name: "pantheon",
        displayName: "Pantheon",
      },
      {
        titleId: leagueOfLegends.id,
        name: "poppy",
        displayName: "Poppy",
      },
      {
        titleId: leagueOfLegends.id,
        name: "pyke",
        displayName: "Pyke",
      },
      {
        titleId: leagueOfLegends.id,
        name: "qiyana",
        displayName: "Qiyana",
      },
      {
        titleId: leagueOfLegends.id,
        name: "quinn",
        displayName: "Quinn",
      },
      {
        titleId: leagueOfLegends.id,
        name: "rakan",
        displayName: "Rakan",
      },
      {
        titleId: leagueOfLegends.id,
        name: "rammus",
        displayName: "Rammus",
      },
      {
        titleId: leagueOfLegends.id,
        name: "reksai",
        displayName: "Rek'Sai",
      },
      {
        titleId: leagueOfLegends.id,
        name: "rell",
        displayName: "Rell",
      },
      {
        titleId: leagueOfLegends.id,
        name: "renata",
        displayName: "Renata Glasc",
      },
      {
        titleId: leagueOfLegends.id,
        name: "renekton",
        displayName: "Renekton",
      },
      {
        titleId: leagueOfLegends.id,
        name: "rengar",
        displayName: "Rengar",
      },
      {
        titleId: leagueOfLegends.id,
        name: "riven",
        displayName: "Riven",
      },
      {
        titleId: leagueOfLegends.id,
        name: "rumble",
        displayName: "Rumble",
      },
      {
        titleId: leagueOfLegends.id,
        name: "ryze",
        displayName: "Ryze",
      },
      {
        titleId: leagueOfLegends.id,
        name: "samira",
        displayName: "Samira",
      },
      {
        titleId: leagueOfLegends.id,
        name: "sejuani",
        displayName: "Sejuani",
      },
      {
        titleId: leagueOfLegends.id,
        name: "senna",
        displayName: "Senna",
      },
      {
        titleId: leagueOfLegends.id,
        name: "seraphine",
        displayName: "Seraphine",
      },
      {
        titleId: leagueOfLegends.id,
        name: "sett",
        displayName: "Sett",
      },
      {
        titleId: leagueOfLegends.id,
        name: "shaco",
        displayName: "Shaco",
      },
      {
        titleId: leagueOfLegends.id,
        name: "shen",
        displayName: "Shen",
      },
      {
        titleId: leagueOfLegends.id,
        name: "shyvana",
        displayName: "Shyvana",
      },
      {
        titleId: leagueOfLegends.id,
        name: "singed",
        displayName: "Singed",
      },
      {
        titleId: leagueOfLegends.id,
        name: "sion",
        displayName: "Sion",
      },
      {
        titleId: leagueOfLegends.id,
        name: "sivir",
        displayName: "Sivir",
      },
      {
        titleId: leagueOfLegends.id,
        name: "skarner",
        displayName: "Skarner",
      },
      {
        titleId: leagueOfLegends.id,
        name: "smolder",
        displayName: "Smolder",
      },
      {
        titleId: leagueOfLegends.id,
        name: "sona",
        displayName: "Sona",
      },
      {
        titleId: leagueOfLegends.id,
        name: "soraka",
        displayName: "Soraka",
      },
      {
        titleId: leagueOfLegends.id,
        name: "swain",
        displayName: "Swain",
      },
      {
        titleId: leagueOfLegends.id,
        name: "sylas",
        displayName: "Sylas",
      },
      {
        titleId: leagueOfLegends.id,
        name: "syndra",
        displayName: "Syndra",
      },
      {
        titleId: leagueOfLegends.id,
        name: "tahmKench",
        displayName: "Tahm Kench",
      },
      {
        titleId: leagueOfLegends.id,
        name: "taliyah",
        displayName: "Taliyah",
      },
      {
        titleId: leagueOfLegends.id,
        name: "talon",
        displayName: "Talon",
      },
      {
        titleId: leagueOfLegends.id,
        name: "taric",
        displayName: "Taric",
      },
      {
        titleId: leagueOfLegends.id,
        name: "teemo",
        displayName: "Teemo",
      },
      {
        titleId: leagueOfLegends.id,
        name: "thresh",
        displayName: "Thresh",
      },
      {
        titleId: leagueOfLegends.id,
        name: "tristana",
        displayName: "Tristana",
      },
      {
        titleId: leagueOfLegends.id,
        name: "trundle",
        displayName: "Trundle",
      },
      {
        titleId: leagueOfLegends.id,
        name: "tryndamere",
        displayName: "Tryndamere",
      },
      {
        titleId: leagueOfLegends.id,
        name: "twistedFate",
        displayName: "Twisted Fate",
      },
      {
        titleId: leagueOfLegends.id,
        name: "twitch",
        displayName: "Twitch",
      },
      {
        titleId: leagueOfLegends.id,
        name: "udyr",
        displayName: "Udyr",
      },
      {
        titleId: leagueOfLegends.id,
        name: "urgot",
        displayName: "Urgot",
      },
      {
        titleId: leagueOfLegends.id,
        name: "varus",
        displayName: "Varus",
      },
      {
        titleId: leagueOfLegends.id,
        name: "vayne",
        displayName: "Vayne",
      },
      {
        titleId: leagueOfLegends.id,
        name: "veigar",
        displayName: "Veigar",
      },
      {
        titleId: leagueOfLegends.id,
        name: "velkoz",
        displayName: "Vel'Koz",
      },
      {
        titleId: leagueOfLegends.id,
        name: "vex",
        displayName: "Vex",
      },
      {
        titleId: leagueOfLegends.id,
        name: "vi",
        displayName: "Vi",
      },
      {
        titleId: leagueOfLegends.id,
        name: "viego",
        displayName: "Viego",
      },
      {
        titleId: leagueOfLegends.id,
        name: "viktor",
        displayName: "Viktor",
      },
      {
        titleId: leagueOfLegends.id,
        name: "vladimir",
        displayName: "Vladimir",
      },
      {
        titleId: leagueOfLegends.id,
        name: "volibear",
        displayName: "Volibear",
      },
      {
        titleId: leagueOfLegends.id,
        name: "warwick",
        displayName: "Warwick",
      },
      {
        titleId: leagueOfLegends.id,
        name: "wukong",
        displayName: "Wukong",
      },
      {
        titleId: leagueOfLegends.id,
        name: "xayah",
        displayName: "Xayah",
      },
      {
        titleId: leagueOfLegends.id,
        name: "xerath",
        displayName: "Xerath",
      },
      {
        titleId: leagueOfLegends.id,
        name: "xinzhao",
        displayName: "Xin Zhao",
      },
      {
        titleId: leagueOfLegends.id,
        name: "yasuo",
        displayName: "Yasuo",
      },
      {
        titleId: leagueOfLegends.id,
        name: "yone",
        displayName: "Yone",
      },
      {
        titleId: leagueOfLegends.id,
        name: "yorick",
        displayName: "Yorick",
      },
      {
        titleId: leagueOfLegends.id,
        name: "yuumi",
        displayName: "Yuumi",
      },
      {
        titleId: leagueOfLegends.id,
        name: "zac",
        displayName: "Zac",
      },
      {
        titleId: leagueOfLegends.id,
        name: "zed",
        displayName: "Zed",
      },
      {
        titleId: leagueOfLegends.id,
        name: "zeri",
        displayName: "Zeri",
      },
      {
        titleId: leagueOfLegends.id,
        name: "ziggs",
        displayName: "Ziggs",
      },
      {
        titleId: leagueOfLegends.id,
        name: "zilean",
        displayName: "Zilean",
      },
      {
        titleId: leagueOfLegends.id,
        name: "zoe",
        displayName: "Zoe",
      },
      {
        titleId: leagueOfLegends.id,
        name: "zyra",
        displayName: "Zyra",
      },
    ],
  });
  // #endregion

  // #region Character Roles

  await prisma.titleCharacterRole.createMany({
    skipDuplicates: true,
    data: [
      { characterId: lolAatrox!.id, roleId: lolTop!.id },
      { characterId: lolAkali!.id, roleId: lolTop!.id },
      { characterId: lolAurora!.id, roleId: lolTop!.id },
      { characterId: lolCamille!.id, roleId: lolTop!.id },
      { characterId: lolChogath!.id, roleId: lolTop!.id },
      { characterId: lolDarius!.id, roleId: lolTop!.id },
      { characterId: lolDrMundo!.id, roleId: lolTop!.id },
      { characterId: lolFiora!.id, roleId: lolTop!.id },
      { characterId: lolGangplank!.id, roleId: lolTop!.id },
      { characterId: lolGaren!.id, roleId: lolTop!.id },
      { characterId: lolGnar!.id, roleId: lolTop!.id },
      { characterId: lolGragas!.id, roleId: lolTop!.id },
      { characterId: lolGwen!.id, roleId: lolTop!.id },
      { characterId: lolHeimerdinger!.id, roleId: lolTop!.id },
      { characterId: lolIllaoi!.id, roleId: lolTop!.id },
      { characterId: lolIrelia!.id, roleId: lolTop!.id },
      { characterId: lolJax!.id, roleId: lolTop!.id },
      { characterId: lolJayce!.id, roleId: lolTop!.id },
      { characterId: lolKsante!.id, roleId: lolTop!.id },
      { characterId: lolKarma!.id, roleId: lolTop!.id },
      { characterId: lolKayle!.id, roleId: lolTop!.id },
      { characterId: lolKennen!.id, roleId: lolTop!.id },
      { characterId: lolKled!.id, roleId: lolTop!.id },
      { characterId: lolMalphite!.id, roleId: lolTop!.id },
      { characterId: lolMordekaiser!.id, roleId: lolTop!.id },
      { characterId: lolNasus!.id, roleId: lolTop!.id },
      { characterId: lolOlaf!.id, roleId: lolTop!.id },
      { characterId: lolOrnn!.id, roleId: lolTop!.id },
      { characterId: lolPantheon!.id, roleId: lolTop!.id },
      { characterId: lolPoppy!.id, roleId: lolTop!.id },
      { characterId: lolQuinn!.id, roleId: lolTop!.id },
      { characterId: lolRenekton!.id, roleId: lolTop!.id },
      { characterId: lolRengar!.id, roleId: lolTop!.id },
      { characterId: lolRiven!.id, roleId: lolTop!.id },
      { characterId: lolRumble!.id, roleId: lolTop!.id },
      { characterId: lolSett!.id, roleId: lolTop!.id },
      { characterId: lolShen!.id, roleId: lolTop!.id },
      { characterId: lolSinged!.id, roleId: lolTop!.id },
      { characterId: lolSion!.id, roleId: lolTop!.id },
      { characterId: lolSkarner!.id, roleId: lolTop!.id },
      { characterId: lolSmolder!.id, roleId: lolTop!.id },
      { characterId: lolSylas!.id, roleId: lolTop!.id },
      { characterId: lolTahmKench!.id, roleId: lolTop!.id },
      { characterId: lolTeemo!.id, roleId: lolTop!.id },
      { characterId: lolTrundle!.id, roleId: lolTop!.id },
      { characterId: lolTryndamere!.id, roleId: lolTop!.id },
      { characterId: lolTwistedFate!.id, roleId: lolTop!.id },
      { characterId: lolUdyr!.id, roleId: lolTop!.id },
      { characterId: lolUrgot!.id, roleId: lolTop!.id },
      { characterId: lolVayne!.id, roleId: lolTop!.id },
      { characterId: lolVladimir!.id, roleId: lolTop!.id },
      { characterId: lolVolibear!.id, roleId: lolTop!.id },
      { characterId: lolWarwick!.id, roleId: lolTop!.id },
      { characterId: lolWukong!.id, roleId: lolTop!.id },
      { characterId: lolYasuo!.id, roleId: lolTop!.id },
      { characterId: lolYone!.id, roleId: lolTop!.id },
      { characterId: lolYorick!.id, roleId: lolTop!.id },
      { characterId: lolZac!.id, roleId: lolTop!.id },
      { characterId: lolAhri!.id, roleId: lolMiddle!.id },
      { characterId: lolAkali!.id, roleId: lolMiddle!.id },
      { characterId: lolAkshan!.id, roleId: lolMiddle!.id },
      { characterId: lolAnivia!.id, roleId: lolMiddle!.id },
      { characterId: lolAnnie!.id, roleId: lolMiddle!.id },
      { characterId: lolAurelionsol!.id, roleId: lolMiddle!.id },
      { characterId: lolAurora!.id, roleId: lolMiddle!.id },
      { characterId: lolAzir!.id, roleId: lolMiddle!.id },
      { characterId: lolBrand!.id, roleId: lolMiddle!.id },
      { characterId: lolCassiopeia!.id, roleId: lolMiddle!.id },
      { characterId: lolCorki!.id, roleId: lolMiddle!.id },
      { characterId: lolDiana!.id, roleId: lolMiddle!.id },
      { characterId: lolEkko!.id, roleId: lolMiddle!.id },
      { characterId: lolFizz!.id, roleId: lolMiddle!.id },
      { characterId: lolGalio!.id, roleId: lolMiddle!.id },
      { characterId: lolGragas!.id, roleId: lolMiddle!.id },
      { characterId: lolHeimerdinger!.id, roleId: lolMiddle!.id },
      { characterId: lolHwei!.id, roleId: lolMiddle!.id },
      { characterId: lolIrelia!.id, roleId: lolMiddle!.id },
      { characterId: lolJayce!.id, roleId: lolMiddle!.id },
      { characterId: lolKarma!.id, roleId: lolMiddle!.id },
      { characterId: lolKassadin!.id, roleId: lolMiddle!.id },
      { characterId: lolKatarina!.id, roleId: lolMiddle!.id },
      { characterId: lolLeblanc!.id, roleId: lolMiddle!.id },
      { characterId: lolLissandra!.id, roleId: lolMiddle!.id },
      { characterId: lolLux!.id, roleId: lolMiddle!.id },
      { characterId: lolMalphite!.id, roleId: lolMiddle!.id },
      { characterId: lolMalzahar!.id, roleId: lolMiddle!.id },
      { characterId: lolNaafiri!.id, roleId: lolMiddle!.id },
      { characterId: lolNeeko!.id, roleId: lolMiddle!.id },
      { characterId: lolOrianna!.id, roleId: lolMiddle!.id },
      { characterId: lolPantheon!.id, roleId: lolMiddle!.id },
      { characterId: lolQiyana!.id, roleId: lolMiddle!.id },
      { characterId: lolRumble!.id, roleId: lolMiddle!.id },
      { characterId: lolRyze!.id, roleId: lolMiddle!.id },
      { characterId: lolSmolder!.id, roleId: lolMiddle!.id },
      { characterId: lolSwain!.id, roleId: lolMiddle!.id },
      { characterId: lolSylas!.id, roleId: lolMiddle!.id },
      { characterId: lolSyndra!.id, roleId: lolMiddle!.id },
      { characterId: lolTaliyah!.id, roleId: lolMiddle!.id },
      { characterId: lolTalon!.id, roleId: lolMiddle!.id },
      { characterId: lolTaric!.id, roleId: lolMiddle!.id },
      { characterId: lolTristana!.id, roleId: lolMiddle!.id },
      { characterId: lolTwistedFate!.id, roleId: lolMiddle!.id },
      { characterId: lolVeigar!.id, roleId: lolMiddle!.id },
      { characterId: lolVelkoz!.id, roleId: lolMiddle!.id },
      { characterId: lolVex!.id, roleId: lolMiddle!.id },
      { characterId: lolViktor!.id, roleId: lolMiddle!.id },
      { characterId: lolVladimir!.id, roleId: lolMiddle!.id },
      { characterId: lolXerath!.id, roleId: lolMiddle!.id },
      { characterId: lolYasuo!.id, roleId: lolMiddle!.id },
      { characterId: lolYone!.id, roleId: lolMiddle!.id },
      { characterId: lolZed!.id, roleId: lolMiddle!.id },
      { characterId: lolZiggs!.id, roleId: lolMiddle!.id },
      { characterId: lolZoe!.id, roleId: lolMiddle!.id },
      { characterId: lolAmumu!.id, roleId: lolJungle!.id },
      { characterId: lolBelveth!.id, roleId: lolJungle!.id },
      { characterId: lolBrand!.id, roleId: lolJungle!.id },
      { characterId: lolBriar!.id, roleId: lolJungle!.id },
      { characterId: lolDiana!.id, roleId: lolJungle!.id },
      { characterId: lolEkko!.id, roleId: lolJungle!.id },
      { characterId: lolElise!.id, roleId: lolJungle!.id },
      { characterId: lolEvelynn!.id, roleId: lolJungle!.id },
      { characterId: lolFiddlesticks!.id, roleId: lolJungle!.id },
      { characterId: lolGragas!.id, roleId: lolJungle!.id },
      { characterId: lolGraves!.id, roleId: lolJungle!.id },
      { characterId: lolHecarim!.id, roleId: lolJungle!.id },
      { characterId: lolIvern!.id, roleId: lolJungle!.id },
      { characterId: lolJarvanIV!.id, roleId: lolJungle!.id },
      { characterId: lolJax!.id, roleId: lolJungle!.id },
      { characterId: lolKarthus!.id, roleId: lolJungle!.id },
      { characterId: lolKayn!.id, roleId: lolJungle!.id },
      { characterId: lolKhazix!.id, roleId: lolJungle!.id },
      { characterId: lolKindred!.id, roleId: lolJungle!.id },
      { characterId: lolLeeSin!.id, roleId: lolJungle!.id },
      { characterId: lolLillia!.id, roleId: lolJungle!.id },
      { characterId: lolMaokai!.id, roleId: lolJungle!.id },
      { characterId: lolMasterYi!.id, roleId: lolJungle!.id },
      { characterId: lolNidalee!.id, roleId: lolJungle!.id },
      { characterId: lolNocturne!.id, roleId: lolJungle!.id },
      { characterId: lolNunu!.id, roleId: lolJungle!.id },
      { characterId: lolPantheon!.id, roleId: lolJungle!.id },
      { characterId: lolPoppy!.id, roleId: lolJungle!.id },
      { characterId: lolRammus!.id, roleId: lolJungle!.id },
      { characterId: lolReksai!.id, roleId: lolJungle!.id },
      { characterId: lolRengar!.id, roleId: lolJungle!.id },
      { characterId: lolSejuani!.id, roleId: lolJungle!.id },
      { characterId: lolShaco!.id, roleId: lolJungle!.id },
      { characterId: lolShyvana!.id, roleId: lolJungle!.id },
      { characterId: lolSkarner!.id, roleId: lolJungle!.id },
      { characterId: lolTaliyah!.id, roleId: lolJungle!.id },
      { characterId: lolTalon!.id, roleId: lolJungle!.id },
      { characterId: lolTeemo!.id, roleId: lolJungle!.id },
      { characterId: lolTrundle!.id, roleId: lolJungle!.id },
      { characterId: lolUdyr!.id, roleId: lolJungle!.id },
      { characterId: lolVi!.id, roleId: lolJungle!.id },
      { characterId: lolViego!.id, roleId: lolJungle!.id },
      { characterId: lolVolibear!.id, roleId: lolJungle!.id },
      { characterId: lolWarwick!.id, roleId: lolJungle!.id },
      { characterId: lolWukong!.id, roleId: lolJungle!.id },
      { characterId: lolXinzhao!.id, roleId: lolJungle!.id },
      { characterId: lolZac!.id, roleId: lolJungle!.id },
      { characterId: lolZed!.id, roleId: lolJungle!.id },
      { characterId: lolAphelios!.id, roleId: lolBottom!.id },
      { characterId: lolAshe!.id, roleId: lolBottom!.id },
      { characterId: lolCaitlyn!.id, roleId: lolBottom!.id },
      { characterId: lolDraven!.id, roleId: lolBottom!.id },
      { characterId: lolEzreal!.id, roleId: lolBottom!.id },
      { characterId: lolJhin!.id, roleId: lolBottom!.id },
      { characterId: lolJinx!.id, roleId: lolBottom!.id },
      { characterId: lolKaisa!.id, roleId: lolBottom!.id },
      { characterId: lolKarthus!.id, roleId: lolBottom!.id },
      { characterId: lolKalista!.id, roleId: lolBottom!.id },
      { characterId: lolKogMaw!.id, roleId: lolBottom!.id },
      { characterId: lolLucian!.id, roleId: lolBottom!.id },
      { characterId: lolMissFortune!.id, roleId: lolBottom!.id },
      { characterId: lolNilah!.id, roleId: lolBottom!.id },
      { characterId: lolSamira!.id, roleId: lolBottom!.id },
      { characterId: lolSenna!.id, roleId: lolBottom!.id },
      { characterId: lolSeraphine!.id, roleId: lolBottom!.id },
      { characterId: lolSivir!.id, roleId: lolBottom!.id },
      { characterId: lolSmolder!.id, roleId: lolBottom!.id },
      { characterId: lolTristana!.id, roleId: lolBottom!.id },
      { characterId: lolTwistedFate!.id, roleId: lolBottom!.id },
      { characterId: lolTwitch!.id, roleId: lolBottom!.id },
      { characterId: lolVarus!.id, roleId: lolBottom!.id },
      { characterId: lolVayne!.id, roleId: lolBottom!.id },
      { characterId: lolXayah!.id, roleId: lolBottom!.id },
      { characterId: lolYasuo!.id, roleId: lolBottom!.id },
      { characterId: lolZeri!.id, roleId: lolBottom!.id },
      { characterId: lolZiggs!.id, roleId: lolBottom!.id },
      { characterId: lolAlistar!.id, roleId: lolSupport!.id },
      { characterId: lolAmumu!.id, roleId: lolSupport!.id },
      { characterId: lolAnivia!.id, roleId: lolSupport!.id },
      { characterId: lolAnnie!.id, roleId: lolSupport!.id },
      { characterId: lolAshe!.id, roleId: lolSupport!.id },
      { characterId: lolBard!.id, roleId: lolSupport!.id },
      { characterId: lolBlitzcrank!.id, roleId: lolSupport!.id },
      { characterId: lolBrand!.id, roleId: lolSupport!.id },
      { characterId: lolBraum!.id, roleId: lolSupport!.id },
      { characterId: lolCamille!.id, roleId: lolSupport!.id },
      { characterId: lolFiddlesticks!.id, roleId: lolSupport!.id },
      { characterId: lolGalio!.id, roleId: lolSupport!.id },
      { characterId: lolHeimerdinger!.id, roleId: lolSupport!.id },
      { characterId: lolHwei!.id, roleId: lolSupport!.id },
      { characterId: lolIvern!.id, roleId: lolSupport!.id },
      { characterId: lolJanna!.id, roleId: lolSupport!.id },
      { characterId: lolKarma!.id, roleId: lolSupport!.id },
      { characterId: lolLeona!.id, roleId: lolSupport!.id },
      { characterId: lolLulu!.id, roleId: lolSupport!.id },
      { characterId: lolLux!.id, roleId: lolSupport!.id },
      { characterId: lolMalphite!.id, roleId: lolSupport!.id },
      { characterId: lolMaokai!.id, roleId: lolSupport!.id },
      { characterId: lolMilio!.id, roleId: lolSupport!.id },
      { characterId: lolMorgana!.id, roleId: lolSupport!.id },
      { characterId: lolNami!.id, roleId: lolSupport!.id },
      { characterId: lolNautilus!.id, roleId: lolSupport!.id },
      { characterId: lolNeeko!.id, roleId: lolSupport!.id },
      { characterId: lolPantheon!.id, roleId: lolSupport!.id },
      { characterId: lolPyke!.id, roleId: lolSupport!.id },
      { characterId: lolRakan!.id, roleId: lolSupport!.id },
      { characterId: lolRell!.id, roleId: lolSupport!.id },
      { characterId: lolRenata!.id, roleId: lolSupport!.id },
      { characterId: lolSenna!.id, roleId: lolSupport!.id },
      { characterId: lolSeraphine!.id, roleId: lolSupport!.id },
      { characterId: lolShaco!.id, roleId: lolSupport!.id },
      { characterId: lolShen!.id, roleId: lolSupport!.id },
      { characterId: lolSona!.id, roleId: lolSupport!.id },
      { characterId: lolSoraka!.id, roleId: lolSupport!.id },
      { characterId: lolSwain!.id, roleId: lolSupport!.id },
      { characterId: lolSyndra!.id, roleId: lolSupport!.id },
      { characterId: lolTahmKench!.id, roleId: lolSupport!.id },
      { characterId: lolTaric!.id, roleId: lolSupport!.id },
      { characterId: lolTeemo!.id, roleId: lolSupport!.id },
      { characterId: lolThresh!.id, roleId: lolSupport!.id },
      { characterId: lolTwitch!.id, roleId: lolSupport!.id },
      { characterId: lolVeigar!.id, roleId: lolSupport!.id },
      { characterId: lolVelkoz!.id, roleId: lolSupport!.id },
      { characterId: lolXerath!.id, roleId: lolSupport!.id },
      { characterId: lolYuumi!.id, roleId: lolSupport!.id },
      { characterId: lolZac!.id, roleId: lolSupport!.id },
      { characterId: lolZilean!.id, roleId: lolSupport!.id },
      { characterId: lolZoe!.id, roleId: lolSupport!.id },
      { characterId: lolZyra!.id, roleId: lolSupport!.id },
    ],
  });
  // #endregion

  // #endregion

  // #endregion

  // #region Events

  // #endregion

  // #region Stages

  // #region Stage Types

  const roundRobinType = await prisma.stageType.upsert({
    where: { name: "round robin" },
    update: { updatedAt: new Date() },
    create: {
      name: "round robin",
      displayName: "Round Robin",
    },
  });

  const swissStageType = await prisma.stageType.upsert({
    where: { name: "swiss stage" },
    update: { updatedAt: new Date() },
    create: {
      name: "swiss stage",
      displayName: "Swiss Stage",
    },
  });

  const singleElimType = await prisma.stageType.upsert({
    where: { name: "single elimination" },
    update: { updatedAt: new Date() },
    create: {
      name: "single elimination",
      displayName: "Single Elimination",
    },
  });

  const doubleElimType = await prisma.stageType.upsert({
    where: { name: "double elimination" },
    update: { updatedAt: new Date() },
    create: {
      name: "double elimination",
      displayName: "Double Elimination",
    },
  });

  // #endregion

  // #endregion

  // #region Phases

  // #endregion

  // #region Matches

  // #region Match Formats

  const bo1MatchFormat = await prisma.matchFormat.upsert({
    where: { name: "bo1" },
    update: { updatedAt: new Date() },
    create: {
      name: "bo1",
      shortName: "BO1",
      displayName: "Best of One",
      targetScore: 1,
      gamesPerMatch: 1,
    },
  });

  const bo3MatchFormat = await prisma.matchFormat.upsert({
    where: { name: "bo3" },
    update: { updatedAt: new Date() },
    create: {
      name: "bo3",
      shortName: "BO3",
      displayName: "Best of Three",
      targetScore: 2,
      gamesPerMatch: 3,
    },
  });

  const bo5MatchFormat = await prisma.matchFormat.upsert({
    where: { name: "bo5" },
    update: { updatedAt: new Date() },
    create: {
      name: "bo5",
      shortName: "BO5",
      displayName: "Best of Five",
      targetScore: 3,
      gamesPerMatch: 5,
    },
  });

  const bo7MatchFormat = await prisma.matchFormat.upsert({
    where: { name: "bo7" },
    update: { updatedAt: new Date() },
    create: {
      name: "bo7",
      shortName: "BO7",
      displayName: "Best of Seven",
      targetScore: 4,
      gamesPerMatch: 7,
    },
  });

  const bo9MatchFormat = await prisma.matchFormat.upsert({
    where: { name: "bo9" },
    update: { updatedAt: new Date() },
    create: {
      name: "bo9",
      shortName: "BO9",
      displayName: "Best of Nine",
      targetScore: 5,
      gamesPerMatch: 9,
    },
  });

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
