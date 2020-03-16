# Day Planner

### Description

This is an exercise in creating a day planner, using the Moment.js library.

- [User-Story](##User-Story)
- [Challenge](##Challenge)
- [Screenshots](##Screenshots)
- [Results](##Results)
- [Lessons-Learned](##Lessons-Learned)

## User-Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Challenge

There were quite a few challenges with this exercise. Mulitple API calls needed to be made to deliver different results, including setting an API call for the UV Index, which was reliant on data from a previous API call.

## Screenshots

We were provided with the below gif as a reference for our work.

![homework demo](./assets/img/homework-demo.png)

Upon completion of the task, my web application can be seen in the image below.

![homework finished](./documents/homework-completed.png)

## Results

The required outputs of this project, including this README, the url of the deployed web application and the url of this repo.

- Deployed App - https://spatiality-dc.github.io/weather-dashboard/

- Github Repo - https://github.com/spatiality-dc/weather-dashboard

## Lessons Learned

- Javascript is still hard.

- In an attempt to avoid "Promise Hell", I tried to limit these calls within calls. Instead, opting to run function names and then setting the criteria for function names after that.

- Traversing the data obtained by the API calls was also difficult.
