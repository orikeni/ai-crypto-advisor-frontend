import type { ContentType } from "./ContentType";

export interface DashboardContentModel  {
    id: number;
    contentType: ContentType;
    content: string;
    apiSource: string;
}