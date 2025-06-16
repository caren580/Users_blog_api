import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const client = new PrismaClient()

app.use(express.json());


app.get("/", (req, res) => {
    res.send("<h1>Hello there</h1>")
})

app.post("/users", async (req, res) => {
    const { firstName, lastName, emailAddress, username} = req.body
    try{
        const user = await client.users.create({
            data: {
                firstName,
                lastName,
                emailAddress,
                username
            }
        })
        res.status(201).json(user)
    }catch (e) {
        res.status(500).json({ message : "something went wrong"})
    }
})

app.get("/users", async (req, res) => {
    try{
        const users = await client.users.findMany()
        res.status(200).json(users)
    }catch (e) {
        console.error(e);
        res.status(500).json({message: "something went wrong"})
    }
})

app.get("/users/:id", async (req, res) =>{
    const { id } = req.params
    try{
        const user = await client.users.findFirst({
            where: {
                id
            }
        })
        if (user){
            res.status(200).json(user)
        }else {
            res.status(404).json({ message: "user does not exist"})
        }
    }catch (e){
        res.status(500).json({ message: "something went wrong"})
    }
})


app.post("/posts", async (req, res) => {
    const {title, content,userId} = req.body
    try{
        const post = await client.posts.create({
            data:{
                title,
                content,
                user_id: userId
            }
        })
        res.status(200).json(post)
    }catch (e){
        console.error(e)
        res.status(500).json({ message: "something went wrong"})
    }
})

app.get("/posts", async (req, res) => {
    try{
        const post = await client.posts.findMany({
            include: {
             user: true
            }
        })
        res.status(200).json(post);
    }catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})

app.get("/posts/:id", async (req, res) =>{
    const { id } = req.params
    try{
        const post = await client.posts.findFirst({
            where: {
                id
            },
            include:{
                user: true
            }
        })
        res.status(200).json(post)
    }catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})



app.put("/posts/:id", async (req, res) => {
    const { id } = req.params
    const { title, content} = req.body
    try{
        const postUpdate = await client.posts.update({
            where:{
                id
            }, 
            data: {
                title: title && title,
                content: content && content
            }
        })
        if (postUpdate){
            res.status(200).json(postUpdate)
        }else {
            res.status(400).json({ message: "post does not exist"})
        }
    }catch (e) {
        res.status(500).json ({message: "something went wrong"})
    }
})

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params
    try{
        const post = await client.posts.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        })
        if (post){
            res.status(200).json(post)
        }else {
            res.status(404).json({ message: "post does not exist"})
        }
    }catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})

let port;
if (process.env.PORT) {
    port = process.env.PORT
} else {
    port = 4000;

}
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})