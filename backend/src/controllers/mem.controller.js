import Mem from '../models/mem.model';

export default class MemController {

    static async save(req, res) {

        const mem = new Mem({
            title: req.body.title,
            description: req.body.description,
            owner: req.jwt_data.name,
            ownerId: req.jwt_data.id,
            createAt: Date.now(),
            link: req.file.path
        });

        try {
            const newMem = await mem.save();

            return res.status(201).json(newMem._id);
        } catch (err) {

            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(501).json(err);
            }

            return res.status(500).send(err);

        }

    }

    static async getMem(req, res) {
        try {
            const mem = await Mem.findOne({
                    _id: req.params.id
                })
                .select('name _id description title owner link createAt');

            if (!mem) {
                return res.status(404).json({
                    message: 'Not found'
                });
            }

            return res.status(200).json(mem);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getAllMemes(req, res) {
        try {
            const memesToSkip = req.param('page') ? req.param('page') * 10 : 0;
            const memesArray = await Mem.find({}).select('name _id description title owner link createAt').sort({ createAt: 'desc' }).limit(10).skip(memesToSkip);
            
            if (memesArray.length == 0)
                return res.status(404).json({
                    message: 'No memes here'
                });

            return res.json(memesArray);
            
        } catch (err) {
            return res.status(500).send(err);
        }
    }

}