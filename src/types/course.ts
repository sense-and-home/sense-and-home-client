interface CourseAuthor {
  id: number;
  fullName: string;
}

interface CourseStep {
  id: string;
  title: string;
  stepTypd: string;
  order: number;
  durationMinutes: number;
  preview: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  authorId: number;
  thumbnailUrl: string;
  imageUrl: string;
  durationSeconds: number;
  published: boolean;
  tags: string[];
  authors: CourseAuthor[];
  createdAt: string;
  updatedAt: string;

  isFavorite: boolean;
  isEnrolled: boolean;
  progressPercent: number;

  lastStepId: string;
  steps: CourseStep[];
}

export interface GetCourseByIdResponse {
  course: Course;
}

type VideoProvider = "youtube" | "vk" | "other";
type LessonType = "video" | "text" | "quiz";

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: LessonType;
  position: number;
  content: string;
  videoProvider?: VideoProvider;
  videoId: string;
  durationSeconds: number;
  createdAt: string;
  updatedAt: string;
}

interface QuizQuestion {
  id: string;
  text: string;
  choices: any;
  correct: any;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

export interface Favorite {
  id: string;
  userId: number;
  courseId: string;
  createdAt: string;
}

interface LessonState {
  lessonId: {
    watchedSeconds: number;
    completed: boolean;
    quizResults: any;
  };
}

export interface Progress {
  id: number;
  userId: number;
  courseId: string;
  lessonId?: string;
  lessonState: LessonState;
  completed: boolean;
  percentCompleted: number;
  updatedAt: string;
}

export interface courseEnrollments {
  id: string;
  userId: number;
  courseId: string;
  enrolledAt: string;
}

type CoursesSorting = "newest" | "durationAsc" | "durationDesc" | "popular";

export interface GetCoursesQueryParameters {
  page: number;
  pageSize: number;
  search: string;
  tags: string[];
  sort: CoursesSorting;
  onlyFavorites: boolean;
  onlyEnrolled: boolean;
}

export interface CoursesPaginated {
  items: Course[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface GetCoursesResponse {
  courses: CoursesPaginated;
}

export interface CourseFavoriteRequest {
  courseId: string;
}

export interface GetFavoriteCoursesResponse {
  favorites: Course[];
}
