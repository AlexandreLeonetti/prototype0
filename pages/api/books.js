import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();




export default async function handler(req, res) {
      if (req.method === 'POST') {
                return await addBook(req, res);
            }
      else if (req.method === 'GET'){
          return await readBooks(req, res);
      }
      else {
                return res.status(405).json({ message: 'Method not allowed', success: false });
            }
}


async function readBooks(req, res){
  const body = req.body;
  console.log(req)
  console.log(res)
  try{
    const allbooks = await prisma.bookSuggestion.findMany();
    return res.status(200).json(allbooks, {success:true});
  }catch (error) {
    console.log("could not access planetscale");
    console.log(error);
    return res.status(500).json({error: "Error reading from database", success: false});
  }
}

async function addBook(req, res) {
      const body = req.body;
      try {
                const newEntry = await prisma.bookSuggestion.create({
                              data: {
                                                bookTitle: body.title,
                                                bookAuthor: body.author,
                                                bookGenre: body.genre,
                                            }
                          });
                return res.status(200).json(newEntry, {success: true});
            } catch (error) {
                      console.error("Request error", error);
                      res.status(500).json({ error: "Error adding book", success:false });
                  }
}
