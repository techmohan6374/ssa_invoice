const routes = [
    { path: '/', component: Login },
    { path: '/main/:password', component: Main },
];

const router = new VueRouter({
    routes,
});
