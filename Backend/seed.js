require("dotenv").config();
const mongoose = require("mongoose");
const JobRequest = require("./models/JobRequest");

const sampleJobs = [
    {
        title: "Leaking kitchen tap needs urgent repair",
        description: "The hot water tap in my kitchen has been dripping constantly for two weeks. Water is pooling under the sink.",
        category: "Plumbing",
        location: "Glasgow",
        contactName: "Margaret Thomson",
        contactEmail: "m.thomson@email.com",
        status: "Open",
    },
    {
        title: "Bathroom ceiling light not working",
        description: "The main ceiling light stopped working after I tried to replace the bulb. The circuit breaker trips every time.",
        category: "Electrical",
        location: "Edinburgh",
        contactName: "James MacLeod",
        contactEmail: "james.macleod@mail.co.uk",
        status: "In Progress",
    },
    {
        title: "Living room and hallway repaint needed",
        description: "Looking for a reliable painter to repaint the living room and hallway. Two coats required. Approximately 60 sqm total.",
        category: "Painting",
        location: "Aberdeen",
        contactName: "Sarah Campbell",
        contactEmail: "sarah.c@outlook.com",
        status: "Open",
    },
    {
        title: "Garden fence panels to replace",
        description: "Three fence panels blown down in last week's storm. Need replacement panels fitted and two broken posts replaced.",
        category: "Joinery",
        location: "Dundee",
        contactName: "Robert Burns",
        contactEmail: "rburns@gmail.com",
        status: "Open",
    },
    {
        title: "Boiler not producing hot water",
        description: "Combi boiler is firing up and heating works fine but there is no hot water from any taps. Error code E133 on display.",
        category: "Plumbing",
        location: "Inverness",
        contactName: "Fiona Mackenzie",
        contactEmail: "fiona.mck@hotmail.com",
        status: "Closed",
    },
    {
        title: "New outdoor power socket required",
        description: "Need a weatherproof outdoor socket installed on the rear exterior wall for garden lighting and power tools.",
        category: "Electrical",
        location: "Glasgow",
        contactName: "David Henderson",
        contactEmail: "d.henderson@icloud.com",
        status: "Open",
    },
    {
        title: "Sash window frame repair and repaint",
        description: "Two original sash windows at the front of a Victorian terrace need the wooden frames repaired and repainted.",
        category: "Joinery",
        location: "Stirling",
        contactName: "Helen Fraser",
        contactEmail: "helen.fraser@btinternet.com",
        status: "Open",
    },
    {
        title: "Exterior walls full repaint",
        description: "Three-bedroom semi-detached house exterior needs a full repaint. Current paint is peeling badly.",
        category: "Painting",
        location: "Perth",
        contactName: "Colin Stewart",
        contactEmail: "col.stewart@yahoo.co.uk",
        status: "In Progress",
    },
    {
        title: "Shower tray drain blocked",
        description: "Ensuite shower tray draining very slowly. Tried standard drain cleaner with no improvement.",
        category: "Plumbing",
        location: "Edinburgh",
        contactName: "Anne Wilson",
        contactEmail: "anne.wilson88@gmail.com",
        status: "Open",
    },
    {
        title: "Consumer unit upgrade required",
        description: "Old fuse box needs replacing with a modern compliant consumer unit. House is a 1970s three-bedroom detached.",
        category: "Electrical",
        location: "Falkirk",
        contactName: "Tom Gillespie",
        contactEmail: "t.gillespie@live.co.uk",
        status: "Open",
    },

];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("  Connected to MongoDB");

        const deleted = await JobRequest.deleteMany({});
        console.log(`  Cleared ${deleted.deletedCount} existing job requests`);

        const inserted = await JobRequest.insertMany(sampleJobs);
        console.log(`  Inserted ${inserted.length} sample job requests`);

        console.log("  Seeding complete!");
    } catch (err) {
        console.error("  Seeding failed:", err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

seedDatabase();