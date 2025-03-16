# Hotel Listing React App

This project was developed as a code challenge for Qantas, focusing on creating a hotel listing application with React.

## Getting Started

### Prerequisites

- Node.js v22.x
- npm v10.x

### Installation

```bash
# Clone the repository
git clone https://github.com/juanchomdiaz/hotel-listing-react.git
cd hotel-listing-react

# Install dependencies
npm install
```

### Running the Application

```bash
# Start development server
npm run start
```

The application will be available at `http://localhost:3000`.

### Testing

```bash
# Run tests
npm run test

# Generate test coverage report
npm run test:coverage
```

## Technical Decisions

### Data Fetching
I chose **React Query** for data fetching to leverage its built-in caching mechanism and automatic retry functionality, which improves the user experience when facing network issues.

### Backend Simulation
The application uses **MirageJS** to simulate a backend environment directly in the browser. This allows for "realistic" API interaction without requiring an actual backend server. The sorting logic is implemented in these stubbed endpoints to replicate real-world backend behavior.

### Build Tools
Although modern bundlers like Vite are trending, I opted for **Webpack** due to its industry-standard reliability and robustness.

### Testing Strategy
The testing suite uses **Jest** with **React Testing Library** for component testing and **userEvent** for simulating user interactions, providing comprehensive test coverage.

### Rating Component
For the rating component, I took a minimalist approach that successfully displays star ratings. While there are limitations regarding icon sizing (requiring font-size adjustments to match other icons), the implementation effectively shows stars and circles as required. I hope this approach lives up to your expectations.

## Project Structure

The project follows a feature-based structure to improve maintainability and scalability:

- `/src/components` - UI components
- `/src/constants` - Files containing constants
- `/src/context` - Context providers
- `/src/hooks` - Files containing hooks
- `/src/styles` - Global styles
- `/src/types` - Typescript types and interface definitions
- `/src/utils` - Helper functions and utilities


## Future Enhancements

### Potential Improvements
Given additional development time, I would implement pagination functionality for the hotel listings, either through a "Load More" button or traditional numerical pagination controls. Furthermore, enhancing the loading state with skeleton placeholders would significantly improve the user experience, along with implementing a more robust, dismissable error notifications to better handle exceptional cases.

