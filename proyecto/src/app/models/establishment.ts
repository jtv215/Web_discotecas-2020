export class Establishment {
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public sexo: string,
        public birth_date: string,
        public phone_user: string,
        public role: string,
        public name_establishment: string,
        public address: string,
        public phone_establishment: string,
        public email_establishment: string,
        public provincia: string,
        public localidad: string,
        public cp: string,
        public image: string,
        public information: string,
        public duration: string,
        public time: string,
        public create_at: string
    ) { }
}