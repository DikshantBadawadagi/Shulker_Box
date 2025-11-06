import {pgTable, text, integer, uuid, boolean, timestamp} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';

export const files = pgTable('files',{
    id : uuid("id").defaultRandom().primaryKey(),

    //files and folder information
    name: text("name").notNull(),
    path : text("path").notNull(),// /document/project/resume.pdf
    size: integer("size").notNull(),
    type: text("type").notNull(), // folder or file

    //storage info
    fileUrl: text("file_url").notNull(), //url to access the file in storage
    thumbnailUrl: text("thumbnail_url"),

    //ownership info
    userId: text("user_id").notNull(),
    parentId : uuid("parent_id"), //parent folder id(null for root folder)

    //file/folder flags
    isFolder : boolean("is_folder").notNull().default(false),
    isStarred : boolean("is_starred").notNull().default(false),
    isTrash : boolean("is_trash").notNull().default(false),


    //timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

})

/*
parent : each file/folder can have only one parent folder
children : but one folder can have multipel files/folders
*/

export const filesRelations = relations(files, ({one,many}) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),
    children: many(files)
}))

//Type definition

export const File = typeof files.$inferSelect
export const newFile = typeof files.$inferInsert