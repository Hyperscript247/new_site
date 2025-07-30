"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import CourseRegistrationForm from "@/components/learning/course-registration-form"
import { getCourses, getCoursesByCategory, searchCourses, seedCoursesData } from "@/app/actions/course-actions"

// Course type definition
type Course = {
  id: string
  title: string
  description: string
  category: string
}

// Course categories
const categories = [
  "Development",
  "Data & AI",
  "Management",
  "Marketing"
]

// Function to get category icons
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Development":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      );
    case "Data & AI":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      );
    case "Management":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
      );
    case "Marketing":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      );
    default:
      return null;
  }
};

export default function CourseList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoryData, setCategoryData] = useState<Record<string, Course[]>>({})

  // State to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Fetch all courses on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);

        // First try to seed the data
        await seedCoursesData();

        // Then fetch all courses
        const result = await getCourses();

        if (result.error) {
          setError(result.error);
        } else if (result.courses) {
          setCourses(result.courses);

          // Organize courses by category
          const categoryMap: Record<string, Course[]> = {};
          categories.forEach(category => {
            categoryMap[category] = result.courses.filter(
              (course: Course) => course.category === category
            );
          });

          setCategoryData(categoryMap);
        }
      } catch (err) {
        setError('Failed to load courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Handle search
  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery) {
        // If search is cleared, reset to all courses
        const result = await getCourses();
        if (result.courses) {
          setCourses(result.courses);

          // Reorganize by category
          const categoryMap: Record<string, Course[]> = {};
          categories.forEach(category => {
            categoryMap[category] = result.courses.filter(
              (course: Course) => course.category === category
            );
          });

          setCategoryData(categoryMap);
        }
        return;
      }

      try {
        setLoading(true);
        const result = await searchCourses(searchQuery);

        if (result.courses) {
          setCourses(result.courses);

          // Reorganize by category
          const categoryMap: Record<string, Course[]> = {};
          categories.forEach(category => {
            categoryMap[category] = result.courses.filter(
              (course: Course) => course.category === category
            );
          });

          setCategoryData(categoryMap);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to prevent excessive database queries
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Get courses for a specific category
  const getCoursesByCat = (category: string) => {
    return categoryData[category] || [];
  }

  // Handle registration button click
  const handleRegisterClick = (course: Course) => {
    setSelectedCourse(course)
    setShowRegistrationForm(true)
  }

  // Handle mouse movement inside cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, courseId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
    setActiveCardId(courseId);
  };

  // Reset when mouse leaves
  const handleMouseLeave = () => {
    setActiveCardId(null);
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Our Courses</h2>
            <div className="relative w-full sm:w-auto max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="Development">
            <TabsList className="mb-6 flex flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-sm sm:text-base">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {getCoursesByCat(category).map((course) => (
                    <Card
                      key={course.id}
                      className="flex flex-col h-full overflow-hidden group border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/20 relative"
                      onMouseMove={(e) => handleMouseMove(e, course.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Static hover background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Mouse-following effect */}
                      {activeCardId === course.id && (
                        <div
                          className="absolute pointer-events-none w-[150px] h-[150px] rounded-full bg-primary/20 dark:bg-primary/30 blur-2xl mix-blend-soft-light transform -translate-x-1/2 -translate-y-1/2 z-0 transition-all duration-300"
                          style={{
                            left: `${mousePosition.x}px`,
                            top: `${mousePosition.y}px`,
                          }}
                        />
                      )}

                      <CardHeader className="relative z-10 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{course.title}</CardTitle>
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {getCategoryIcon(course.category)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10 flex-grow py-2">
                        <CardDescription className="text-base font-medium text-foreground/80 dark:text-foreground/70">
                          {course.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="relative z-10 pt-2">
                        <Button
                          variant="outline"
                          className="w-full bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-primary/30 group-hover:border-primary font-medium"
                          onClick={() => handleRegisterClick(course)}
                        >
                          Register
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                {getCoursesByCat(category).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No courses found. Try adjusting your search.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Registration Form Dialog */}
        {selectedCourse && (
          <CourseRegistrationForm
            course={selectedCourse}
            open={showRegistrationForm}
            onOpenChange={setShowRegistrationForm}
          />
        )}
      </div>
    </section>
  )
}
