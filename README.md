# samnivesha-react
This is the Samnivesha Github page. It is based on React, Express, Node.Js and MongoDB. For User Experience perspective, We are using Server side rendering to compile our javascript code on server side and send it back to client with HTML and CSS.

If you are not familiar with Server side rendering please go through [this article](https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38)

# File Structure
```bash
.
├── babel.config.js
├── build
├── LICENSE
├── package.json
├── public
│   ├── app.js
│   ├── bundle.js
│   ├── css
│   ├── images
│   └── vendor.js
├── README.md
├── src
│   ├── browser
│   │   └── index.js
│   ├── server
│   │   ├── config.js
│   │   ├── index.js
│   │   └── routes.js
│   └── shared
│       ├── about.js
│       ├── App.js
│       ├── blog.js
│       ├── components
│       │   ├── footer.js
│       │   ├── header.js
│       │   └── layout.js
│       ├── contact.js
│       ├── home.js
│       ├── login.js
│       ├── routes.js
│       └── schedule.js
├── views
│   └── index.ejs
├── webpack.config.js
└── yarn.lock

```

## Installations
```bash
git clone https://github.com/samnivesha-iitp/samnivesha-react
cd samnivesha-react
yarn install
yarn dev
```
# Todo List
- [ ] Landing Page for `/` route
- [ ] Blog Page consists of previous year glimpse of Samnivesha events, Guest Lecture and some details about each event
- [ ] Contact page on `/contact` 
- [ ] about page on `/about`
- [ ] login will be on `/login`
- [ ] All signup will be redirected to `/signup`
- [ ] A connection to MongoDB database
