import jwt from "jsonwebtoken";
import ws from "ws";
import dotenv from "dotenv";
import app from "./server";
import mongoose from "mongoose";
import messageModel from "./models/message.Model";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const server = app.listen(process.env.PORT, () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(String(process.env.MONGODB_URL))
        .then(() => {
            // eslint-disable-next-line no-console
            console.log(`server is runing on port ${process.env.PORT}`);
        })
        .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
        });
});

const wss: any = new ws.WebSocketServer({ server });

wss.on("connection", (connection: any, req) => {
    // read username and id from the cookie for this connection
    const cookies = req.headers.cookie;
    const tokenCookieString = cookies?.split(";").find((str: any) => {
        return str.startsWith("token=");
    });
    if (cookies) {
        if (tokenCookieString) {
            const token = tokenCookieString.split("=")[1];
            if (token) {
                jwt.verify(
                    token,
                    process.env.JWT_ACCESS_SECRET as string,
                    (err, userData) => {
                        if (err) throw err;
                        const { userId, username }: any = userData;
                        connection.userId = userId;
                        connection.username = username;
                    },
                );
            }
        }
    }

    function notifyAboutOnlinePeople() {
        [...wss.clients].forEach(client => {
            client.send(JSON.stringify({
                online: [...wss.clients].map(c => ({ userId: c.userId, username: c.username })),
            }));
        });
    }

    connection.isAlive = true;

    connection.timer = setInterval(() => {
        connection.ping();
        connection.deathTimer = setTimeout(() => {
            connection.isAlive = false;
            clearInterval(connection.timer);
            connection.terminate();
            notifyAboutOnlinePeople();
            console.log("dead");
        }, 1000);
    }, 5000);

    connection.on("pong", () => {
        clearTimeout(connection.deathTimer);
    });


    connection.on("message", async (message: any) => {
        const messageData: any = JSON.parse(message.toString());
        const { recipient, text }: any = messageData.message;

        // console.log([...wss.clients].filter((c:any) => c.userId === recipient));

        if (recipient && text) {
            const messageDox = await messageModel.create({
                sender: connection.userId,
                recipient,
                text,
            })

                ;[...wss.clients]
                .filter((c: any) => c.userId === recipient)
                .forEach((c: any) =>
                    c.send(
                        JSON.stringify({
                            text,
                            sender: connection.userId,
                            id: messageDox._id,
                        }),
                    ),
                );
        }
    });

    // notify everyone about online people (when somone connects)
    // ;[...wss.clients].forEach((client: any) => {
    //     client.send(
    //         JSON.stringify({
    //             online: [...wss.clients].map((c: any) => ({
    //                 userId: c.userId,
    //                 username: c.username,
    //             })),
    //         }),
    //     );
    // });
    notifyAboutOnlinePeople();
});
