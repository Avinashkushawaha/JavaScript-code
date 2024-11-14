let student = {
    id: 99,
    name: "abc",
    marks: [12, 343],
    subject: { Web: 80, java: 80 },
    isPresent: true
  }
  

// get

console.log(student.name);
console.log(student);
console.log(student.marks);
console.log(student.subject.java);
// edit

student.isPresent = false;
console.log(student)

student.age = "20"
console.log(student);
//delete

delete student.marks
console.log(student);



