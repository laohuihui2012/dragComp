const routes= [
    {
      path: '/',
      name: 'home.nav',
      key: 1,
      style: {'margin-left': '20px'},
      children: [
        {
          path: 'home/goods',
          name: 'goods',
        },
        {
          path: 'home/user',
          name: 'user',
        }
      ]
    },
    {
        path: '/',
        name: 'home.user',
        style: {'margin-left': '20px'},
        key: 2,
        children: [
          {
            path: 'home/goods',
            name: 'home.goods',
          },
          {
            path: 'home/user',
            name: 'home.user',
          }
        ]
      },
  ]

export default routes