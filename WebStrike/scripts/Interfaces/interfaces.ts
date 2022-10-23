export interface cinemas {
    id: number;
    data: any; //json
    Logo: string;
    Name: string;
    Description: string;
}

export interface actors {
    id: number;
    ProfilePictureURL: string;
    FullName: string;
    Bio: string;
    MovieId: number;
}

export interface producers {
    id: number;
    ProfilePictureURL: string;
    FullName: string;
    Bio: string;
}

export interface movies {
    id: number;
    Name: string;
    Price: number;
    MovieCategory: number;
    Description: string;
    ImageURL: string;
    StartDate: Date;
    EndDate: Date;
    CinemaId: number;
    ProducerId: number;
}