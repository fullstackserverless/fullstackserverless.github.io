
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/blog',
  component: ComponentCreator('/blog'),
  exact: true,
  
},
{
  path: '/blog/00',
  component: ComponentCreator('/blog/00'),
  exact: true,
  
},
{
  path: '/blog/01',
  component: ComponentCreator('/blog/01'),
  exact: true,
  
},
{
  path: '/blog/02',
  component: ComponentCreator('/blog/02'),
  exact: true,
  
},
{
  path: '/blog/03',
  component: ComponentCreator('/blog/03'),
  exact: true,
  
},
{
  path: '/blog/tags',
  component: ComponentCreator('/blog/tags'),
  exact: true,
  
},
{
  path: '/blog/tags/apollo',
  component: ComponentCreator('/blog/tags/apollo'),
  exact: true,
  
},
{
  path: '/blog/tags/aws-amplify',
  component: ComponentCreator('/blog/tags/aws-amplify'),
  exact: true,
  
},
{
  path: '/blog/tags/mob-x',
  component: ComponentCreator('/blog/tags/mob-x'),
  exact: true,
  
},
{
  path: '/blog/tags/reactnative',
  component: ComponentCreator('/blog/tags/reactnative'),
  exact: true,
  
},
{
  path: '/blog/tags/redux',
  component: ComponentCreator('/blog/tags/redux'),
  exact: true,
  
},
{
  path: '/blog/tags/startup-village',
  component: ComponentCreator('/blog/tags/startup-village'),
  exact: true,
  
},
{
  path: '/blog/tags/димкареактнативный',
  component: ComponentCreator('/blog/tags/димкареактнативный'),
  exact: true,
  
},
{
  path: '/blog/tags/заметки',
  component: ComponentCreator('/blog/tags/заметки'),
  exact: true,
  
},
{
  path: '/blog/tags/заявка',
  component: ComponentCreator('/blog/tags/заявка'),
  exact: true,
  
},
{
  path: '/docs/:route',
  component: ComponentCreator('/docs/:route'),
  
  routes: [
{
  path: '/docs/amplify-00',
  component: ComponentCreator('/docs/amplify-00'),
  exact: true,
  
},
{
  path: '/docs/amplify-01',
  component: ComponentCreator('/docs/amplify-01'),
  exact: true,
  
},
{
  path: '/docs/amplify-02',
  component: ComponentCreator('/docs/amplify-02'),
  exact: true,
  
},
{
  path: '/docs/amplify-03',
  component: ComponentCreator('/docs/amplify-03'),
  exact: true,
  
},
{
  path: '/docs/amplify-04',
  component: ComponentCreator('/docs/amplify-04'),
  exact: true,
  
},
{
  path: '/docs/auth1-00',
  component: ComponentCreator('/docs/auth1-00'),
  exact: true,
  
},
{
  path: '/docs/auth1-01',
  component: ComponentCreator('/docs/auth1-01'),
  exact: true,
  
},
{
  path: '/docs/auth1-02',
  component: ComponentCreator('/docs/auth1-02'),
  exact: true,
  
},
{
  path: '/docs/startup00',
  component: ComponentCreator('/docs/startup00'),
  exact: true,
  
},
{
  path: '/docs/unicorn00',
  component: ComponentCreator('/docs/unicorn00'),
  exact: true,
  
},
{
  path: '/docs/unicorn01',
  component: ComponentCreator('/docs/unicorn01'),
  exact: true,
  
},
{
  path: '/docs/unicorn02',
  component: ComponentCreator('/docs/unicorn02'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
