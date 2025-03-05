import generateHash from "../generateHash.js";

export default class ShortURL {
    public url: string;
    public hash: string;

    constructor(url: string, hash: string) {
        this.url = url;
        this.hash = hash;
    }

    static async create(url: string): Promise<ShortURL> {
        const hash = await generateHash(url);
        return new ShortURL(url, hash);
    }

    get getHash() {
        return this.hash;
    }
}