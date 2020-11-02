import Vue from 'vue'
import {
    Button, Header, Footer,
    Main, Container, Collapse,
    CollapseItem, Row, Col,
    Form,FormItem,Table,
    TableColumn, Input, Autocomplete,
    Aside,Menu,MenuItem,MenuItemGroup,
    Submenu,Tabs,TabPane,Pagination,
    Loading,Tooltip,Popconfirm,
    Select,Option
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';


Vue.use(Button)
Vue.use(Header);
Vue.use(Footer);
Vue.use(Main);
Vue.use(Container);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(Autocomplete);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Pagination);
Vue.use(Loading);
Vue.use(Tooltip);
Vue.use(Popconfirm);
Vue.use(Select);
Vue.use(Option);