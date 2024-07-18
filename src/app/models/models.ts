export class ItemRss {
    Id?: number;
    Type_item:string="rss";
    Page?: string;
    DatePublication?: string;
    Title?:string;
    Autor?:string;
    Tnterctions?:number;
    BodyText?:string;
    Summary?:string;
    UrlAticle?:string;

}

export class ItemReddit {
    Id?: number;
    Type_item:string="reddit";
    DatePub?: string;
    NameProfile?: string;
    TitlePub?: string;
    TextPub?: string;
    CantUpVotes?: number;
    CantDownVotes?: number;
    CantShares?: number;
}

export class ItemX{
    Id?:number;
    Type_item:string="x";
    DatePub?:string;
    UserPorifle?:string;
    NameProfile?:string;
    TextPub?:string;
    CantLikes?:number;
    CantRetweets?:number;
    CantComents?:number;
}
