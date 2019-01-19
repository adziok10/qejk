export class Mem {

    _id: string;
    title: string;
    description: string;
    owner: string;
    createAt: Date;
    link: string;

    constructor(_id: string,
        title: string,
        description: string,
        owner: string,
        createAt: Date,
        link: string) {
            this._id = _id;
            this.title = title;
            this.description = description;
            this.owner = owner;
            this.createAt = createAt;
            this.link = link;
        }

    public isAbsoluteLink(linka) {
        const re = /^(http:\/\/|https:\/\/|http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        return re.test(linka);
    }
}
