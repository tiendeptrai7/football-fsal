import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from 'class-validator';

class PlayerDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    dateOfBirth: string;

    @IsString()
    nationality: string;

    @IsString()
    section: string;

    @IsOptional()
    @IsString()
    position?: string;

    @IsOptional()
    @IsNumber()
    shirtNumber?: number;

    @IsString()
    lastUpdated: string;
}

class TeamDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    shortName: string;

    @IsString()
    tla: string;

    @IsString()
    crest: string;

    @IsString()
    address: string;

    @IsString()
    website: string;

    @IsNumber()
    founded: number;

    @IsString()
    clubColors: string;

    @IsString()
    venue: string;

    @IsString()
    lastUpdated: string;
}

class ScorerDto {
    player: PlayerDto;
    team: TeamDto;

    @IsNumber()
    playedMatches: number;

    @IsNumber()
    goals: number;

    @IsOptional()
    @IsNumber()
    assists?: number;

    @IsOptional()
    @IsNumber()
    penalties?: number;
}

class SeasonDto {
    @IsNumber()
    id: number;

    @IsString()
    startDate: string;

    @IsString()
    endDate: string;

    @IsNumber()
    currentMatchday: number;

    @IsOptional()
    @IsString()
    winner?: string;
}

class CompetitionDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    code: string;

    @IsString()
    type: string;

    @IsString()
    emblem: string;
}

class FiltersDto {
    @IsString()
    season: string;

    @IsNumber()
    limit: number;
}

export class ScorersResponseDto {
    @IsNumber()
    count: number;

    filters: FiltersDto;

    competition: CompetitionDto;

    season: SeasonDto;

    @IsArray()
    @IsNotEmpty({ each: true })
    scorers: ScorerDto[];
}
