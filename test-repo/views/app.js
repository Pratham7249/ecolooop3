const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const authRoutes = require('./routes/auth');
const ecoResourcesRoutes = require('./routes/eco_resources'); // New route for eco resources

const leaderboardRoutes = require('./routes/leaderboard');

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.set('layout', 'layouts/boilerplate.ejs');
app.use('/auth', authRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/eco-resources', ecoResourcesRoutes); // New route for eco resources



app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post('/upload-image', async (req, res) => {
    // Handle image upload and call Gemini API
    // const user = null; 
    const imageFile = req.files.image; // Assuming you're using a file upload middleware like multer

    try {
        const response = await axios.post('https://api.gemini.com/v1/upload', {
            image: imageFile.data.toString('base64') // Convert image to base64
        });

        const geminiResponse = response.data; // Get the response from Gemini API
        res.render('dashboard', { user, geminiResponse }); // Pass the Gemini response to the view
    } catch (error) {
        console.error('Error uploading image to Gemini API:', error);
        res.render('dashboard', { user, error: 'Failed to upload image.' });
    }
});







app.get('/dashboard', (req, res) => {
    const user = null; 
    res.render('dashboard', { user }); // Render the dashboard view

}); // Added closing bracket


    // const user = null; 


app.get('/recycling', (req, res) => {
    const user = null; 
    res.render('recycling', { user });
});







app.get('/', (req, res) => {
    const user = null; 
    const cityWasteManagementRanking = require('./init/data'); // Add this line to import the data
    res.render('home', { user, cityWasteManagementRanking }); // Pass the data to the view
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
