export interface Author {
  id: number;
  value: string;
  Book: Book[];
}

export interface Book {
  id: number;
  adult: boolean;
  costChapter: number;
  name: string;
  images: Image[];
  authorId: number;
  author: Author | null;
  createdById: number;
  createdBy: User | null;
  updatedById: number;
  updatedBy: User | null;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  statusTranslate: string;
  originalName: string;
  translatorId: number;
  translator: User | null;
  likes: number;
  type: string;
  views: number;
  year: number;
  fandoms: Fandom[];
  tags: Tag[];
  genres: Genre[];
  Subscription: Subscription[];
  AdPurchase: AdPurchase[];
  Rating: Rating[];
  Chapter: Chapter[];
  _count: {
    Chapter: number;
  };
}

export interface Image {
  id: number;
  src: string;
  bookId: number;
  book: Book | null;
}

export interface Fandom {
  id: number;
  name: string;
  books?: Book[];
}

export interface Tag {
  id: number;
  name: string;
  books?: Book[];
}

export interface Genre {
  id: number;
  name: string;
  books?: Book[];
}

export interface User {
  id: number;
  name: string | null;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  booksCreatedByMe: Book[];
  booksUpdatedByMe: Book[];
  booksTranslator: Book[];
  role: string;
  teamAdmin: Team[];
  complaints: Complaint[];
  bans: BanList[];
  SubscriptionPurchase: SubscriptionPurchase[];
  AdPurchase: AdPurchase[];
  Rating: Rating[];
  Comment: Comment[];
}

export interface Volume {
  id: number;
  bookId: number;
  value: string;
}

export interface Chapter {
  id: number;
  accessStatus: string;
  bookId: number;
  discussionId: number;
  chapterNumber: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number | null;
  chapterStatus: string;
  costChapter: number;
  costAudio: number;
  content: string | null;
  views: number;
  likes: number;
  downloaded: number;
  Book: Book;
  Discussion: Discussion;
}

export interface Comment {
  id: number;
  userId: number;
  text: string;
  parentId?: number;
  likes: number;
  dislikes: number;
  createdAt: Date;
  spoiler: boolean;
  discussionId: number;
  discussion: Discussion;
  User: User;
}

export interface Discussion {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  Chapters: Chapter[];
  Comments: Comment[];
}

export interface Rating {
  id: number;
  rating: number;
  bookId: number;
  book: Book;
  userId: number;
  user: User;
}

export interface Team {
  id: number;
  name: string;
  img: string;
  likes: number;
  adminId: number;
  admin: User | null;
}

export interface Subscription {
  id: number;
  type: string;
  cost: number;
  bookId: number;
  book: Book;
  purchases: SubscriptionPurchase[];
}

export interface SubscriptionPurchase {
  id: number;
  subscriptionId: number;
  subscription: Subscription;
  userId: number;
  user: User;
  createdAt: Date;
  duration: number;
  endDate: Date;
  isActive: boolean;
}

export interface AdPurchase {
  id: number;
  bookId: number;
  book: Book;
  userId: number;
  user: User;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface Complaint {
  id: number;
  description: string;
  status: ComplaintStatus;
  userId: number;
  user: User;
  createdAt: Date;
}

export interface BanList {
  id: number;
  reason: string;
  status: BanStatus;
  userId: number;
  user: User;
  createdAt: Date;
}

export enum Role {
  USER,
  ADMIN,
}

export enum Original {
  ONGOING,
  FREEZED,
}

export enum Type {
  Japanese,
  Authors,
  Chinese,
  Korean,
}

export enum ComplaintStatus {
  PENDING,
  RESOLVED,
  DISMISSED,
}

export enum BanStatus {
  PENDING,
  JUSTIFIED,
  UNJUSTIFIED,
}
