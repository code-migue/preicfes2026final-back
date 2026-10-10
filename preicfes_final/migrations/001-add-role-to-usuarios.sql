ALTER TABLE Usuarios
ADD COLUMN Rol ENUM('estudiante', 'administrador') NOT NULL DEFAULT 'estudiante';
