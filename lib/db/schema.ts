import {pgTable, text, uuid, integer, boolean, timestamp} 
from  "drizzle-orm/pg-core";
import {relations } from "drizzle-orm";
import path from "path";
import { fileURLToPath } from "url";
import { Children, use } from "react";


export const files = pgTable("files", {
    id : uuid("id").defaultRandom().primaryKey(),

    //basic file and folder information
    name : text("name").notNull(),//it show that name cannot be null,
    path : text("path").notNull(), //document/project/file.txt
    size : integer("size").notNull(), //it show that size cannot be null
    type : text("type").notNull(), //it show that type cannot be null "FOLDER"


    //Storing Information for the user and the data cause we are making a self relation thing in it.
    fileUrl: text("fileUrl").notNull(), //url accessing the file
    thumbnailUrl: text("thumbnailUrl"), //url accessing the thumbnail of the file


    //Owner of the file
    userId: text("userId").notNull(),
    parentId: uuid("parentId"), //it show that parentId can be null, it is used to make a self relation thing


    //file and folder flags (where we define marked star , bookmark and trashed)
    isfolder: boolean("isfolder").default(false).notNull(), //it show that isfolder cannot be null, it is used to make a self relation thing
    isStarred: boolean("isStarred").default(false).notNull(), //it show that isStarred cannot be null, it is used to make a self relation thing
    isBookmarked: boolean("isBookmarked").default(false).notNull(), //it show that isBookmarked cannot be null, it is used to make a self relation thing
    istrashed: boolean("istrashed").default(false).notNull(), //it show that istrashed cannot be null, it is used to make a self relation thing

    //Timestamps for the file
    createdAt: timestamp("createdAt").defaultNow().notNull(), //it show that createdAt cannot be null, it is used to make a self relation thing
    updatedAt: timestamp("updatedAt").defaultNow().notNull(), //it show that updatedAt cannot be null, it is used to make a self relation thing




})

//parent: eahc file and folder can have a parent, so we can make a self relation thing
//Children: each file and folder can have many children, so we can make a self relation thing

export const filesRelations = relations(files, ({one, many}) => ({

    parent: one(files, {
        fields: [files.parentId],
        references: [files.id],
    }), //it show that parent is a one to many relation, it is used to make a self relation thing


    Children: many(files) 


}))

//type defination for the files table
export const file = typeof files.$inferSelect;
export const Newfile = typeof files.$inferInsert;


