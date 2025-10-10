import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  HubInviteForUserViewModel,
  HubSummary,
  type TeamInviteForUserViewModel,
  type TeamSummary,
} from "@ascnd-gg/types";
import { TeamsService } from "../teams/teams.service";
import { HubsService } from "../hubs/hubs.service";

@Injectable()
export class MeService {
  private readonly logger = new Logger(MeService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly teamService: TeamsService,
    private readonly hubService: HubsService,
  ) {}

  async getCurrentUserTeams(userId: string): Promise<Array<TeamSummary>> {
    const teamsSelect = await this.prismaService.userTeam.findMany({
      where: { userId: userId },
      select: {
        team: {
          select: {
            id: true,
            name: true,
            displayName: true,
            logo: true,
            banner: true,
            teamOwnerId: true,
          },
        },
      },
    });

    const teams: Array<TeamSummary> = teamsSelect.map(({ team }) => {
      return {
        id: team.id,
        name: team.name,
        displayName: team.displayName,
        logo: team.logo,
        banner: team.banner,
        isTeamOwner: userId === team.teamOwnerId,
      };
    });

    return teams;
  }

  async getCurrentUserHubs(userId: string): Promise<Array<HubSummary>> {
    const hubsSelect = await this.prismaService.userHub.findMany({
      where: { userId: userId },
      select: {
        hub: {
          select: {
            id: true,
            name: true,
            displayName: true,
            logo: true,
            banner: true,
            hubOwnerId: true,
          },
        },
      },
    });

    const hubs: Array<HubSummary> = hubsSelect.map(({ hub }) => {
      return {
        id: hub.id,
        name: hub.name,
        displayName: hub.displayName,
        logo: hub.logo,
        banner: hub.banner,
        isHubOwner: userId === hub.hubOwnerId,
      };
    });

    return hubs;
  }

  async getCurrentUserTeamInvites(
    userId: string,
  ): Promise<Array<TeamInviteForUserViewModel>> {
    const teamInvites = await this.teamService.getTeamInvitesForUser(
      // TODO: Allow user to pass status as query parameter
      "PENDING",
      userId,
    );

    return teamInvites;
  }

  async getCurrentUserHubInvites(
    userId: string,
  ): Promise<Array<HubInviteForUserViewModel>> {
    const hubInvites = await this.hubService.getHubInvitesForUser(
      // TODO: Allow user to pass status as query parameter
      "PENDING",
      userId,
    );

    return hubInvites;
  }
}
