export class ItemRss {
    Id?: any;
    Type_item:string="Rss";
    Page?: string;
    DatePublication?: string;
    Title?:string;
    Autor?:string;
    Tnterctions?:number;
    BodyText?:string;
    Summary?:string;
    UrlAticle?:string;
    TrueLevel?:number;
    ContextLevel?:number;
    inference?:string;
    rating?:number;
}


export class ItemReddit {
    Id?: any;
    Type_item:string="Reddit";
    DatePub?: string;
    NameProfile?: string;
    TitlePub?: string;
    TextPub?: string;
    CantUpVotes?: number;
    CantDownVotes?: number;
    CantShares?: number;
    TrueLevel?:number;
    ContextLevel?:number;
    inference?:string;
    rating?:number;
}

export class ItemX{
    Id?:any;
    Type_item:string="X";
    DatePub?:string;
    UserPorifle?:string;
    NameProfile?:string;
    TextPub?:string;
    CantLikes?:number;
    CantRetweets?:number;
    CantComents?:number;
    TrueLevel?:number;
    ContextLevel?:number;
    inference?:string;
    rating?:number;
}
