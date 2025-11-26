import { Router, Request, Response } from 'express';
import HeroSlide from '../models/HeroSlide';

const router = Router();

// GET /api/home-info - Get home page information
router.get('/', async (req: Request, res: Response) => {
  try {
    const slides = await HeroSlide.findAll({
      where: { isActive: true },
      order: [['order', 'ASC']],
    });

    // Return an extensible object that can include popups, features, etc. in the future
    res.json({
      slides,
      // Future additions:
      // popups: [],
      // features: [],
    });
  } catch (error) {
    console.error('Error fetching home info:', error);
    res.status(500).json({ message: 'Error fetching home page information' });
  }
});

export default router;
