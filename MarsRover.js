class Plateau {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    isValidPosition(x, y) {
        return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
    }
}

class Rover {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    turnLeft() {
        const directions = ['N', 'W', 'S', 'E'];
        const currentIndex = directions.indexOf(this.direction);
        this.direction = directions[(currentIndex + 1) % 4];
    }

    turnRight() {
        const directions = ['N', 'E', 'S', 'W'];  // Fixed the correct order for right turn
        const currentIndex = directions.indexOf(this.direction);
        this.direction = directions[(currentIndex + 1) % 4];
    }

    moveForward() {
        switch(this.direction) {
            case 'N': this.y += 1; break;
            case 'E': this.x += 1; break;
            case 'S': this.y -= 1; break;
            case 'W': this.x -= 1; break;
        }
    }

    getPosition() {
        return `${this.x} ${this.y} ${this.direction}`;
    }
}

function executeCommands(input) {
    const lines = input.trim().split('\n');
    
    const [width, height] = lines[0].split(' ').map(Number);
    const plateau = new Plateau(width, height);

    const results = [];
    
    for (let i = 1; i < lines.length; i += 2) {
        const [x, y, direction] = lines[i].split(' ');
        const rover = new Rover(Number(x), Number(y), direction);
        const commands = lines[i + 1];
        
        for (const command of commands) {
            if (command === 'L') rover.turnLeft();
            if (command === 'R') rover.turnRight();
            if (command === 'M') {
                rover.moveForward();
                if (!plateau.isValidPosition(rover.x, rover.y)) {
                    throw new Error('Movement would place rover outside plateau');
                }
            }
        }
        
        results.push(rover.getPosition());
    }

    return results.join('\n');
}

// Test input
const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

console.log(executeCommands(input));