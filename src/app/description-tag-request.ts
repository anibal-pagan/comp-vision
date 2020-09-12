import { Description } from "./description";
import { Metadata } from "./metadata";
import { TagConfidence } from "./tag-confidence";

export interface DescriptionTagRequest {
    tags: TagConfidence[];
    description: Description;
    requestId: string;
    metadata: Metadata;
}
