// Khi xác thực người dùng thành công
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  // Xác thực password...

  // Trả về thông tin người dùng kèm role
  res.json({
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
      // Các thông tin khác...
    },
    token: generateToken(user),
  });
});

// Trong component xử lý sau đăng nhập
useEffect(() => {
  if (user) {
    switch (user.role) {
      case "MENTOR":
        navigate("/mentor/dashboard");
        break;
      case "ADMIN":
        navigate("/admin/dashboard");
        break;
      case "LEARNER":
        navigate("/learner/dashboard");
        break;
      default:
        navigate("/");
    }
  }
}, [user]);

// Bảo vệ các route admin
function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

// Tương tự với MentorRoute
