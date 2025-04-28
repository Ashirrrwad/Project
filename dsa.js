const topics = {
    "Arrays": { completed: 0, total: 20, description: "Learn about arrays, their operations, and applications." },
    "Strings": { completed: 0, total: 20, description: "Explore string manipulations, algorithms, and patterns." },
    "Search & Sort": { completed: 0, total: 20, description: "Understand sorting algorithms and search techniques." },
    "Linked List": { completed: 0, total: 20, description: "Work with linked lists, operations like insert, delete, reverse." },
    "Stacks & Queues": { completed: 0, total: 20, description: "Study stack and queue operations and applications." },
    "Binary Trees": { completed: 0, total: 40, description: "Learn about binary trees, tree traversal, and operations." },
    "Heaps": { completed: 0, total: 41, description: "Understand heap data structure and its use in priority queues." },
    "Graphs": { completed: 0, total: 38, description: "Explore graph algorithms like BFS, DFS, and shortest path." },
    "Dynamic Programming": { completed: 0, total: 10, description: "Solve problems using dynamic programming techniques." },
    "Bit Manipulation": { completed: 0, total: 10, description: "Learn bit-level operations for solving complex problems." },
    "Backtracking": { completed: 0, total: 10, description: "Implement backtracking to solve constraint satisfaction problems." },
    "BST": { completed: 0, total: 10, description: "Understand binary search trees and their various operations." },

};

const container = document.getElementById("cardContainer");

function createCards() {
    for (let topicName in topics) {
        const card = document.createElement("div");
        card.className = "card";
        
        // Updated routing for the "Start Now" button
        card.innerHTML = `
          <button class="start-btn" onclick="event.stopPropagation(); window.location.href = '${topicName.toLowerCase().replace(/\s+/g, '')}.html';">Start Now</button>
          <div class="card-title">${topicName}</div>
          <div class="card-description">${topics[topicName].description}</div>
          <div class="progress-bar">
            <div class="progress-fill" id="${topicName}-progress"></div>
          </div>
        `;
  
        container.appendChild(card);
    }
}

function updateProgress(topicName) {
    const topic = topics[topicName];
    if (topic.completed >= topic.total) return;

    topic.completed += 1;
    if (topic.completed > topic.total) topic.completed = topic.total;

    const percent = (topic.completed / topic.total) * 100;
    document.getElementById(`${topicName}-progress`).style.width = percent + "%";

    updateMainProgress();
}

function updateMainProgress() {
    let totalCompleted = 0;
    let totalQuestions = 0;

    for (let key in topics) {
        totalCompleted += topics[key].completed;
        totalQuestions += topics[key].total;
    }

    const overallPercent = (totalCompleted / totalQuestions) * 100;
    document.getElementById("mainProgress").style.width = overallPercent + "%";
}

function resetProgress() {
    for (let key in topics) {
        topics[key].completed = 0;
        document.getElementById(`${key}-progress`).style.width = "0%";
    }
    document.getElementById("mainProgress").style.width = "0%";
}

// Initialize
createCards();
