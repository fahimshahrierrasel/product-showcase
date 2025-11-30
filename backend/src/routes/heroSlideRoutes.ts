import express from 'express';
import {
    getAllHeroSlides,
    getHeroSlideById,
    createHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
} from '../controllers/heroSlideController';

const router = express.Router();

router.get('/', getAllHeroSlides);
router.get('/:id', getHeroSlideById);
router.post('/', createHeroSlide);
router.put('/:id', updateHeroSlide);
router.delete('/:id', deleteHeroSlide);

export default router;
