
export class UserService {
    public static userId = Math.random().toString().substring(2);
    private static userMap = {};
    private static colorClasses = ['lightgreen', 'lightpink', 'lightsteelblue', 'palevioletred', 'lightseagreen',
        'palegoldenrod', 'plum', 'thistle', 'salmon'];

    public static getColorClass(userId: string){
        if (this.userMap[userId]) {
            return this.userMap[userId];
        }

        const index = Object.keys(this.userMap).length % this.colorClasses.length;

        this.userMap[userId] = this.colorClasses[index];
        return this.userMap[userId];
    }
}
