export const dummyUser = {
  _id: "6618bfaeecd98a1ab85d9a44",
  username: "john_doe",
  email: "john@example.com",
  bio: "Full Stack Developer",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
  skills: ["JavaScript", "React", "Node.js"],
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    portfolio: "https://johndoe.dev",
  },
  followers: [
    {
      _id: "6618bfaeecd98a1ab85d9a45",
      username: "jane_smith",
      avatar: "https://avatar.iran.liara.run/username?username=jane_smith",
    },
  ],
  following: [
    {
      _id: "6618bfaeecd98a1ab85d9a46",
      username: "mike_lee",
      avatar: "https://avatar.iran.liara.run/username?username=mike_lee",
    },
  ],
};

export const dummyComments = [
  {
    text: "Great post! Thanks for sharing.",
    post: "6618c0b64ad98b2bb2fda12f",
    user: {
      _id: "6618bfaeecd98a1ab85d9a44",
      username: "john_doe",
      avatar: "https://avatar.iran.liara.run/username?username=john_doe",
    },
    createdAt: "2023-10-01T12:00:00Z",
  },
  {
    text: "This really helped me understand the topic.",
    post: "6618c0b64ad98b2bb2fda12f",
    user: {
      _id: "6618bfaeecd98a1ab85d9a45",
      username: "jane_smith",
      avatar: "https://avatar.iran.liara.run/username?username=jane_smith",
    },
    createdAt: "2023-10-01T13:30:00Z",
  },
  {
    text: "Looking forward to more posts like this.",
    post: "6618c0b64ad98b2bb2fda12f",
    user: {
      _id: "6618bfaeecd98a1ab85d9a46",
      username: "mike_lee",
      avatar: "https://avatar.iran.liara.run/username?username=mike_lee",
    },
    createdAt: "2023-10-01T14:45:00Z",
  },
  {
    text: "Can you explain more about the second section?",
    post: "6618c0b64ad98b2bb2fda12f",
    user: {
      _id: "6618bfaeecd98a1ab85d9a47",
      username: "emma_white",
      avatar: "https://avatar.iran.liara.run/username?username=emma_white",
    },
    createdAt: "2023-10-01T15:20:00Z",
  },
  {
    text: "Awesome content. Subscribed!",
    post: "6618c0b64ad98b2bb2fda12f",
    user: {
      _id: "6618bfaeecd98a1ab85d9a48",
      username: "chris_black",
      avatar: "https://avatar.iran.liara.run/username?username=chris_black",
    },
    createdAt: "2023-10-01T16:05:00Z",
  },
];

export const dummyNotifications =[
  // LIKE notifications
  {
    _id: "6820aa98ab12cf0e71234567",
    recipient: "68115f5c297a81146c757eea",
    sender: {
      _id: "68115f5c297a81146c757eeb",
      username: "raj",
      avatar: "https://avatar.iran.liara.run/username?username=raj"
    },
    type: "like",
    post: {
      _id: "6811685e6982e609d54f7d45",
      caption: "We are hiring talented developers!",
      image: "https://i.pinimg.com/736x/c5/99/a5/c599a55ef1a6a4c4e45bf78aeb60226d.jpg"
    },
    isRead: false,
    createdAt: "2025-04-30T12:34:56.000Z",
    updatedAt: "2025-04-30T12:34:56.000Z"
  },
  {
    _id: "6820aa98ab12cf0e71234568",
    recipient: "68115f5c297a81146c757eea",
    sender: {
      _id: "68115f5c297a81146c757eec",
      username: "neha",
      avatar: "https://avatar.iran.liara.run/username?username=neha"
    },
    type: "like",
    post: {
      _id: "6811685e6982e609d54f7d46",
      caption: "Check out my latest artwork!",
      image: "https://i.pinimg.com/originals/e2/65/f4/e265f43e5b5ad61c2cc8c40d7c8e6466.jpg"
    },
    isRead: true,
    createdAt: "2025-04-29T08:15:22.000Z",
    updatedAt: "2025-04-29T08:15:22.000Z"
  },

  // COMMENT notifications
  {
    _id: "6820aa98ab12cf0e71234569",
    recipient: "68115f5c297a81146c757eea",
    sender: {
      _id: "68115f5c297a81146c757eed",
      username: "anita",
      avatar: "https://avatar.iran.liara.run/username?username=anita"
    },
    type: "comment",
    post: {
      _id: "6811685e6982e609d54f7d47",
      caption: "Sunsets are my favorite thing to paint.Sunsets are my favorite thing to paint.Sunsets are my favorite thing to paint.Sunsets are my favorite thing to paint.Sunsets are my favorite thing to paint.Sunsets are my favorite thing to paint.Sunsets are my favorite thing to paint.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    isRead: false,
    createdAt: "2025-04-30T10:00:00.000Z",
    updatedAt: "2025-04-30T10:00:00.000Z"
  },
  {
    _id: "6820aa98ab12cf0e71234570",
    recipient: "68115f5c297a81146c757eea",
    sender: {
      _id: "68115f5c297a81146c757eee",
      username: "karan",
      avatar: "https://avatar.iran.liara.run/username?username=karan"
    },
    type: "comment",
    post: {
      _id: "6811685e6982e609d54f7d48",
      caption: "Just finished my travel vlog – check it out!",
      image: "https://images.unsplash.com/photo-1541233349642-6e425fe6190e"
    },
    isRead: true,
    createdAt: "2025-04-28T14:20:00.000Z",
    updatedAt: "2025-04-28T14:20:00.000Z"
  },

  // FOLLOW notifications (no post)
  {
    _id: "6820aa98ab12cf0e71234571",
    recipient: "68115f5c297a81146c757eea",
    sender: {
      _id: "68115f5c297a81146c757eef",
      username: "meena",
      avatar: "https://avatar.iran.liara.run/username?username=meena"
    },
    type: "follow",
    isRead: false,
    createdAt: "2025-04-30T06:45:00.000Z",
    updatedAt: "2025-04-30T06:45:00.000Z"
  },
  {
    _id: "6820aa98ab12cf0e71234572",
    recipient: "68115f5c297a81146c757eea",
    sender: {
      _id: "68115f5c297a81146c757ef0",
      username: "vishal",
      avatar: "https://avatar.iran.liara.run/username?username=vishal"
    },
    type: "follow",
    isRead: true,
    createdAt: "2025-04-27T11:00:00.000Z",
    updatedAt: "2025-04-27T11:00:00.000Z"
  }
]


export const dummyPosts = [
  {
    _id: "6811685e6982e609d54f7d45",
    caption:
      "Hiring start for different positions in our company.Hiring start for different positions in our company.Hiring start for different positions in our company.Hiring start for different positions in our company.",
    image:
      "https://i.pinimg.com/736x/c5/99/a5/c599a55ef1a6a4c4e45bf78aeb60226d.jpg",
    createdBy: {
      _id: "681ba2941fb5fcd88eb49447",
      username: "ajay",
      bio: "Software Engineer",
      avatar: "https://avatar.iran.liara.run/username?username=ajay",
    },
    likes: ["68116562f969fcf45ae502d8", "68116562f969fcf45ae502d9"],
    comments: [
      "68116562f969fcf45ae502d8",
      "68116562f969fcf45ae502d9",
      "68116562f969fcf45ae502d8",
      "68116562f969fcf45ae502d9",
    ],
    createdAt: "2025-04-30T00:01:34.037Z",
    updatedAt: "2025-04-30T00:13:33.505Z",
    __v: 2,
  },
  {
    _id: "6811685e6982e609d54f7d99",
    caption:
      "Join us at the Tech Expo 2025! Explore the latest in AI, robotics, and cloud computing. Don’t miss out on exciting opportunities and workshops led by industry leaders.",
    image: "https://images.unsplash.com/photo-1581091870622-2f73d7d5d5d0",
    createdBy: {
      _id: "68115f5c297a81146c757ee0",
      username: "sara_tech",
      bio: "Tech Enthusiast & Event Organizer",
      avatar: "https://avatar.iran.liara.run/username?username=sara_tech",
    },
    likes: [
      "68116562f969fcf45ae50001",
      "68116562f969fcf45ae50002",
      "68116562f969fcf45ae50003",
    ],
    comments: ["68116562f969fcf45ae50001", "68116562f969fcf45ae50002"],
    createdAt: "2025-04-29T18:30:00.000Z",
    updatedAt: "2025-04-30T08:00:00.000Z",
    __v: 1,
  },
  {
    _id: "6811685e6982e609d54f7da0",
    caption:
      "We are excited to launch our new AI-powered resume screening tool. Streamline your hiring process with smarter tech.",
    image: "https://images.unsplash.com/photo-1612831455543-14c4f43de3a3",
    createdBy: {
      _id: "68115f5c297a81146c757ee1",
      username: "recruit_ai",
      bio: "HR Tech Innovator",
      avatar: "https://avatar.iran.liara.run/username?username=recruit_ai",
    },
    likes: ["68116562f969fcf45ae50101"],
    comments: ["68116562f969fcf45ae50101", "68116562f969fcf45ae50102"],
    createdAt: "2025-04-28T14:22:10.000Z",
    updatedAt: "2025-04-29T09:15:00.000Z",
    __v: 1,
  },
  {
    _id: "6811685e6982e609d54f7da1",
    caption:
      "Throwback to our team outing last weekend. Great food, fun games, and the best colleagues ever!",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
    createdBy: {
      _id: "68115f5c297a81146c757ee2",
      username: "nina_dev",
      bio: "Frontend Developer",
      avatar: "https://avatar.iran.liara.run/username?username=nina_dev",
    },
    likes: ["68116562f969fcf45ae50105", "68116562f969fcf45ae50106"],
    comments: ["68116562f969fcf45ae50106"],
    createdAt: "2025-04-27T10:45:20.000Z",
    updatedAt: "2025-04-28T11:00:00.000Z",
    __v: 1,
  },
  {
    _id: "6811685e6982e609d54f7da2",
    caption:
      "New blog is out! Learn how to optimize your React app performance with simple tricks and real-world examples.",
    image: "https://images.unsplash.com/photo-1537432376769-00a3c7d5f67f",
    createdBy: {
      _id: "68115f5c297a81146c757ee3",
      username: "code_master",
      bio: "Full Stack Developer & Blogger",
      avatar: "https://avatar.iran.liara.run/username?username=code_master",
    },
    likes: [],
    comments: [],
    createdAt: "2025-04-30T01:20:00.000Z",
    updatedAt: "2025-04-30T01:20:00.000Z",
    __v: 0,
  },
];
