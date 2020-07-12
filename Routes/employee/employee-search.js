const express = require('express');

const router = express.Router();
const {
  searchByEmployer, searchByLocation, searchByLanguageTrack, searchByAvailability,
} = require('../../Controllers/employee/employee-search');

// search employees by employer id
router.get('/search/employer', searchByEmployer);
// search employees by city or state
router.get('/search/location', searchByLocation);
// search employees by language or track
router.get('/search/track', searchByLanguageTrack);

router.get('/search/availability/', searchByAvailability);

module.exports = router;
