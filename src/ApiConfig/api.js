const JslAPI = {
    url:'http://127.0.0.1:3000',
    selIsBookmarkTitle:'/connect/selIsBookmarkTitle',
    aggregate:'/connect/aggregate',
    selBookmarkTitles:'/connect/selBookmarkTitles',
    addBookmarkTitles:'/connect/addBookmarkTitles',
    addBookmarks:'/connect/addBookmarks',
    aggregatePagination:'/connect/aggregatePagination',
    updateBookmarkTypes:'/connect/updateBookmarkTypes',
    delBookmarksTypes:'/connect/delBookmarksTypes',
    delBookmarkTitle:'/connect/delBookmarkTitle'
}
export default JslAPI
// export default class JslAPI {
//     constructor(ssl=false) {
//         console.log('欢迎使用梦尼玛的API！');
//         this.ssl = ssl;
//         this.url = '127.0.0.1:3000';
//         this.selIsBookmarkTitle = 'connect/selIsBookmarkTitle';
//         this.aggregate = 'connect/aggregate';
//         this.selBookmarkTitles = 'connect/selBookmarkTitles';
//         this.addBookmarkTitles = 'connect/addBookmarkTitles';
//         this.addBookmarks = 'connect/addBookmarks';
//     }
//     #getHttp = () => {
//         return this.ssl?"https://":"http";
//     }
//     #getHttpUrl = () => {
//         return this.url + this.#getHttp();
//     }
//     get url(){
//         return `${this.#getHttp}${this.url}`;
//     }
//     set url(val){
//         this.url = val;
//     }
//     get selIsBookmarkTitle(){
//         return `${this.#getHttpUrl}/${this.selIsBookmarkTitle}`;
//     }
//     set selIsBookmarkTitle(val){
//         this.selIsBookmarkTitle = val;
//     }
//     get aggregate(){
//         return `${this.#getHttpUrl}/${this.aggregate}`;
//     }
//     set aggregate(val){
//         this.aggregate = val;
//     }
//     get selBookmarkTitles(){
//         return `${this.#getHttpUrl}/${this.selBookmarkTitles}`;
//     }
//     set selBookmarkTitles(val){
//         this.selBookmarkTitles = val;
//     }
//     get addBookmarkTitles(){
//         return `${this.#getHttpUrl}/${this.addBookmarkTitles}`;
//     }
//     set addBookmarkTitles(val){
//         this.addBookmarkTitles = val;
//     }
//     get addBookmarks(){
//         return `${this.#getHttpUrl}/${this.addBookmarks}`;
//     }
//     set addBookmarks(val){
//         this.addBookmarks = val;
//     }
// }