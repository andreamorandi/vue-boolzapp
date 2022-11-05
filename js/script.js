const { createApp } = Vue;
const dt = luxon.DateTime;
let messages = document.getElementsByClassName("message");

createApp({
    data() {
        return {
            activeContact: 0,
            insertedMessage: "",
            searchQuery: "",
            showSearchWarning: false,
            menuIndex: null,
            showChatMenu: false,
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020, 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020, 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020, 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        },
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020, 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020, 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020, 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        },
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020, 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020, 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020, 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        },
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020, 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020, 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        },
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020, 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020, 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        },
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020, 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020, 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020, 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        },
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020, 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020, 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        },
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020, 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020, 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020, 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        setActiveContact(contactIndex) {
            this.activeContact = contactIndex;
        },
        sendMessage() {
            if(this.insertedMessage !== "") {
                const newMessage = {
                    date: this.generateDateTime(),
                    message: this.insertedMessage,
                    status: 'sent'
                }
                this.contacts[this.activeContact].messages.push(newMessage);
                this.insertedMessage = "";
                this.replyDefault(this.activeContact);
                this.chatScrollDown();
            }
        },
        generateDateTime() {
            return dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);;
        },
        replyDefault(whoReplies) {
            setTimeout(() => {
                const now = dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
                const reply = {
                    date: now,
                    message: 'Ok!',
                    status: 'received'
                }
                this.contacts[whoReplies].messages.push(reply);
                this.chatScrollDown();
            }, 1000);
        },
        search(){
            this.contacts.forEach(contact => {
                contact.visible = contact.name.toLowerCase().startsWith(this.searchQuery.toLowerCase());
            });
            this.showSearchWarning = this.noVisibleContact();
        },
        noVisibleContact() {
            let noVisibleContact = true;
            this.contacts.forEach(contact => {
                if(contact.visible) {
                    noVisibleContact = false;
                }
            });
            return noVisibleContact;
        },
        setMenuIndex(index) {
            this.menuIndex = index;
        },
        hideMessageMenu() {
            document.addEventListener("click", (event) => {
                messages = document.getElementsByClassName("message");
                if(this.menuIndex !== null) {
                    if(this.menuIndex > messages.length - 1) {
                        this.menuIndex = null;
                    }
                }
                if(this.menuIndex !== null) {
                    if(!messages[this.menuIndex].contains(event.target)) {
                        this.menuIndex = null;
                    }
                }
            });
        },
        deleteMessage(index) {
            this.contacts[this.activeContact].messages.splice(index, 1);
            this.menuIndex = null;
        },
        setShowChatMenu() {
            document.addEventListener("click", (event) => {
                this.showChatMenu = event.target.matches(".chat-menu-icon") ? true : false;
            });
        },
        deleteMessages() {
            this.contacts[this.activeContact].messages = [];
        },
        deleteChat() {
            this.contacts.splice(this.activeContact, 1);
        },
        chatScrollDown() {
            this.$nextTick(() => {
                this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight;
            });
        }
    },
    mounted() {
        this.hideMessageMenu();
        this.setShowChatMenu();
    },
}).mount("#app");